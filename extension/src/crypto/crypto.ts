import sodium, { StateAddress } from "libsodium-wrappers-sumo";
import {
    B64EncryptionResult,
    BytesOrB64,
    EncryptedBlob,
    EncryptedBlobB64,
    EncryptedBlobBytes,
    EncryptedBox,
    EncryptedBoxB64,
} from "./types";

export const toB64 = async (input: Uint8Array) => {
    await sodium.ready;
    return sodium.to_base64(input, sodium.base64_variants.ORIGINAL);
};

export async function generateEncryptionKey() {
    await sodium.ready;
    return await toB64(sodium.crypto_kdf_keygen());
}
export const generateKeyPair = async () => {
    await sodium.ready;
    const keyPair = sodium.crypto_box_keypair();
    return {
        publicKey: await toB64(keyPair.publicKey),
        privateKey: await toB64(keyPair.privateKey),
    };
};
export async function generateSaltToDeriveKey() {
    await sodium.ready;
    return await toB64(sodium.randombytes_buf(sodium.crypto_pwhash_SALTBYTES));
}

export async function deriveSensitiveKey(passphrase: string, salt: string) {
    await sodium.ready;
    const minMemLimit = sodium.crypto_pwhash_MEMLIMIT_MIN;
    let opsLimit = sodium.crypto_pwhash_OPSLIMIT_SENSITIVE;
    let memLimit = sodium.crypto_pwhash_MEMLIMIT_SENSITIVE;
    while (memLimit > minMemLimit) {
        try {
            const key = await deriveKey(passphrase, salt, opsLimit, memLimit);
            return {
                key,
                opsLimit,
                memLimit,
            };
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            opsLimit *= 2;
            memLimit /= 2;
        }
    }
    throw new Error("Failed to derive key: Memory limit exceeded");
}
export async function deriveKey(passphrase: string, salt: string, opsLimit: number, memLimit: number) {
    await sodium.ready;
    return await toB64(
        sodium.crypto_pwhash(
            sodium.crypto_secretbox_KEYBYTES,
            await fromUTF8(passphrase),
            await fromB64(salt),
            opsLimit,
            memLimit,
            sodium.crypto_pwhash_ALG_ARGON2ID13,
        ),
    );
}
export async function fromUTF8(input: string) {
    await sodium.ready;
    return sodium.from_string(input);
}
export const fromB64 = async (input: string) => {
    await sodium.ready;
    return sodium.from_base64(input, sodium.base64_variants.ORIGINAL);
};

export async function encryptToB64(data: string, keyB64: string) {
    await sodium.ready;
    const encrypted = await encryptBoxB64(data, keyB64);
    return {
        encryptedData: encrypted.encryptedData,
        key: keyB64,
        nonce: encrypted.nonce,
    } as B64EncryptionResult;
}

export const bytes = async (bob: BytesOrB64) => (typeof bob == "string" ? fromB64(bob) : bob);

export const encryptBoxB64 = async (data: BytesOrB64, key: BytesOrB64): Promise<EncryptedBoxB64> => {
    await sodium.ready;
    const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
    const encryptedData = sodium.crypto_secretbox_easy(await bytes(data), nonce, await bytes(key));
    return {
        encryptedData: await toB64(encryptedData),
        nonce: await toB64(nonce),
    };
};

export const decryptBox = async ({ encryptedData, nonce }: EncryptedBox, key: BytesOrB64) => {
    await sodium.ready;
    const k = sodium.crypto_secretbox_open_easy(await bytes(encryptedData), await bytes(nonce), await bytes(key));
    return k;
    // const decoder = new TextDecoder('utf-8');
    // return decoder.decode(k);
};

export const decryptBoxB64 = (box: EncryptedBox, key: BytesOrB64): Promise<string> => decryptBox(box, key).then(toB64);

export async function boxSealOpen(input: string, publicKey: string, secretKey: string) {
    await sodium.ready;
    return await toB64(sodium.crypto_box_seal_open(await fromB64(input), await fromB64(publicKey), await fromB64(secretKey)));
}

export async function boxSeal(input: string, publicKey: string) {
    await sodium.ready;
    return await toB64(sodium.crypto_box_seal(await fromB64(input), await fromB64(publicKey)));
}

export const mergeUint8Arrays = (as: Uint8Array[]) => {
    // A longer but better performing replacement of
    //
    //     new Uint8Array(as.reduce((acc, x) => acc.concat(...x), []))
    //

    const len = as.reduce((len, xs) => len + xs.length, 0);
    const result = new Uint8Array(len);
    as.reduce((n, xs) => (result.set(xs, n), n + xs.length), 0);
    return result;
};
export const ENCRYPTION_CHUNK_SIZE = 4 * 1024 * 1024;

export const decryptChaCha = async (data: Uint8Array, header: Uint8Array, key: string) => {
    await sodium.ready;
    const pullState = sodium.crypto_secretstream_xchacha20poly1305_init_pull(header, await fromB64(key));
    const decryptionChunkSize = ENCRYPTION_CHUNK_SIZE + sodium.crypto_secretstream_xchacha20poly1305_ABYTES;
    let bytesRead = 0;
    const decryptedChunks = [];
    let tag = sodium.crypto_secretstream_xchacha20poly1305_TAG_MESSAGE;
    while (tag !== sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL) {
        let chunkSize = decryptionChunkSize;
        if (bytesRead + chunkSize > data.length) {
            chunkSize = data.length - bytesRead;
        }
        const buffer = data.slice(bytesRead, bytesRead + chunkSize);
        const pullResult = sodium.crypto_secretstream_xchacha20poly1305_pull(pullState, buffer);
        // TODO:
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!pullResult.message) {
            throw new Error("failed");
        }
        decryptedChunks.push(pullResult.message);
        tag = pullResult.tag;
        bytesRead += chunkSize;
    }
    return mergeUint8Arrays(decryptedChunks);
};

export async function initChunkEncryption() {
    await sodium.ready;
    const key = sodium.crypto_secretstream_xchacha20poly1305_keygen();
    const initPushResult = sodium.crypto_secretstream_xchacha20poly1305_init_push(key);
    const [pushState, header] = [initPushResult.state, initPushResult.header];
    return {
        key: await toB64(key),
        decryptionHeader: await toB64(header),
        pushState,
    };
}

export async function encryptFileChunk(data: Uint8Array, pushState: sodium.StateAddress, isFinalChunk: boolean) {
    await sodium.ready;
    const tag = isFinalChunk
        ? sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL
        : sodium.crypto_secretstream_xchacha20poly1305_TAG_MESSAGE;
    const pushResult = sodium.crypto_secretstream_xchacha20poly1305_push(pushState, data, null, tag);

    return pushResult;
}

// export const encryptFileStream = async (fileData: FileStream) => {
//   const { stream, chunkCount } = fileData;
//   const fileStreamReader = stream.getReader();
//   const { key, decryptionHeader, pushState } = await initChunkEncryption();
//   const ref = { pullCount: 1 };
//   const encryptedFileStream = new ReadableStream({
//     async pull(controller) {
//       const { value } = await fileStreamReader.read();
//       if (value) {
//         const encryptedFileChunk = await encryptFileChunk(
//           value,
//           pushState,
//           ref.pullCount === chunkCount
//         );
//         controller.enqueue(encryptedFileChunk);
//       } else {
//         controller.close();
//       }

//       if (ref.pullCount === chunkCount) {
//         controller.close();
//       }
//       ref.pullCount++;
//     },
//   });
//   return {
//     key,
//     file: {
//       decryptionHeader,
//       encryptedData: { stream: encryptedFileStream, chunkCount },
//     },
//   };
// };

export const encryptChaCha = async (data: Uint8Array) => {
    await sodium.ready;

    const uintkey: Uint8Array = sodium.crypto_secretstream_xchacha20poly1305_keygen();

    const initPushResult = sodium.crypto_secretstream_xchacha20poly1305_init_push(uintkey);
    const [pushState, header] = [initPushResult.state, initPushResult.header];
    let bytesRead = 0;
    let tag = sodium.crypto_secretstream_xchacha20poly1305_TAG_MESSAGE;

    const encryptedChunks = [];

    while (tag !== sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL) {
        let chunkSize = ENCRYPTION_CHUNK_SIZE;
        if (bytesRead + chunkSize >= data.length) {
            chunkSize = data.length - bytesRead;
            tag = sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL;
        }

        const buffer = data.slice(bytesRead, bytesRead + chunkSize);
        bytesRead += chunkSize;
        const pushResult = sodium.crypto_secretstream_xchacha20poly1305_push(pushState, buffer, null, tag);
        encryptedChunks.push(pushResult);
    }
    return {
        key: await toB64(uintkey),
        file: {
            encryptedData: mergeUint8Arrays(encryptedChunks),
            decryptionHeader: await toB64(header),
        },
    };
};

export async function initChunkDecryption(header: Uint8Array, key: Uint8Array) {
    await sodium.ready;
    const pullState = sodium.crypto_secretstream_xchacha20poly1305_init_pull(header, key);
    const decryptionChunkSize = ENCRYPTION_CHUNK_SIZE + sodium.crypto_secretstream_xchacha20poly1305_ABYTES;
    const tag = sodium.crypto_secretstream_xchacha20poly1305_TAG_MESSAGE;
    return { pullState, decryptionChunkSize, tag };
}

export async function decryptFileChunk(data: Uint8Array, pullState: StateAddress) {
    await sodium.ready;
    const pullResult = sodium.crypto_secretstream_xchacha20poly1305_pull(pullState, data);
    if (!pullResult.message) {
        throw new Error("error");
    }
    const newTag = pullResult.tag;
    return { decryptedData: pullResult.message, newTag };
}

export const encryptBlobB64 = async (data: BytesOrB64, key: BytesOrB64): Promise<EncryptedBlobB64> => {
    const { encryptedData, decryptionHeader } = await encryptBlob(data, key);
    return {
        encryptedData: await toB64(encryptedData),
        decryptionHeader: await toB64(decryptionHeader),
    };
};

export const encryptBlob = async (data: BytesOrB64, key: BytesOrB64): Promise<EncryptedBlobBytes> => {
    await sodium.ready;

    const uintkey = await bytes(key);
    const initPushResult = sodium.crypto_secretstream_xchacha20poly1305_init_push(uintkey);
    const [pushState, header] = [initPushResult.state, initPushResult.header];

    const pushResult = sodium.crypto_secretstream_xchacha20poly1305_push(
        pushState,
        await bytes(data),
        null,
        sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL,
    );
    return {
        encryptedData: pushResult,
        decryptionHeader: header,
    };
};

export async function encryptUTF8(data: string, key: string) {
    const b64Data = await toB64(await fromUTF8(data));
    return await encryptToB64(b64Data, key);
}

export async function decryptToUTF8(encryptedData: string, nonce: string, keyB64: string) {
    await sodium.ready;
    const decrypted = await decryptBox({ encryptedData, nonce }, keyB64);
    return sodium.to_string(decrypted);
}

export async function decryptB64(encryptedData: string, nonce: string, keyB64: string) {
    return decryptBoxB64({ encryptedData, nonce }, keyB64);
}

export const encryptMetadataJSON = async (r: { jsonValue: unknown; keyB64: string }) => {
    const { encryptedData, decryptionHeader } = await _encryptMetadataJSON_New(r.jsonValue, r.keyB64);
    return {
        encryptedDataB64: encryptedData,
        decryptionHeaderB64: decryptionHeader,
    };
};

export const _encryptMetadataJSON_New = (jsonValue: unknown, key: BytesOrB64) =>
    encryptBlobB64(new TextEncoder().encode(JSON.stringify(jsonValue)), key);

export const decryptBlob = async ({ encryptedData, decryptionHeader }: EncryptedBlob, key: BytesOrB64): Promise<Uint8Array> => {
    await sodium.ready;
    const pullState = sodium.crypto_secretstream_xchacha20poly1305_init_pull(await bytes(decryptionHeader), await bytes(key));
    const pullResult = sodium.crypto_secretstream_xchacha20poly1305_pull(pullState, await bytes(encryptedData), null);
    return pullResult.message;
};

export const _decryptMetadataJSON_New = async (blob: EncryptedBlob, key: BytesOrB64) =>
    JSON.parse(new TextDecoder().decode(await decryptBlob(blob, key))) as unknown;

export const _decryptMetadataJSON = async (r: { encryptedDataB64: string; decryptionHeaderB64: string; keyB64: string }) =>
    _decryptMetadataJSON_New(
        {
            encryptedData: r.encryptedDataB64,
            decryptionHeader: r.decryptionHeaderB64,
        },
        r.keyB64,
    );
