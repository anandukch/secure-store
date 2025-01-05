import { expose } from "comlink";
import * as crypto from "./crypto";
import { BytesOrB64, EncryptedBox } from "./types";

export class CryptoWorker {
    async toB64(data: Uint8Array) {
        return crypto.toB64(data);
    }

    async generateEncryptionKey() {
        return crypto.generateEncryptionKey();
    }

    async generateKeyPair() {
        return crypto.generateKeyPair();
    }

    async encryptBoxB64(data: string, key: string) {
        return crypto.encryptBoxB64(data, key);
    }

    async generateSaltToDeriveKey() {
        return crypto.generateSaltToDeriveKey();
    }

    async deriveSensitiveKey(password: string, salt: string) {
        return crypto.deriveSensitiveKey(password, salt);
    }

    async deriveKey(passphrase: string, salt: string, opsLimit: number, memLimit: number) {
        return crypto.deriveKey(passphrase, salt, opsLimit, memLimit);
    }

    async encryptToB64(data: string, keyB64: string) {
        return crypto.encryptToB64(data, keyB64);
    }

    async decryptBox(box: EncryptedBox, key: string) {
        return crypto.decryptBox(box, key);
    }

    async decryptBoxB64(box: EncryptedBox, key: BytesOrB64) {
        console.log("decryptBoxB64", box, key);

        return crypto.decryptBoxB64(box, key);
    }

    async boxSealOpen(input: string, publicKey: string, secretKey: string) {
        return crypto.boxSealOpen(input, publicKey, secretKey);
    }

    async boxSeal(input: string, publicKey: string) {
        return crypto.boxSeal(input, publicKey);
    }

    async encryptUTF8(data: string, key: string) {
        return crypto.encryptUTF8(data, key);
    }

    async decryptToUTF8(data: string, nonce: string, key: string) {
        return crypto.decryptToUTF8(data, nonce, key);
    }

    async decryptB64(data: string, nonce: string, key: string) {
        return crypto.decryptB64(data, nonce, key);
    }

    async encryptFile(data: Uint8Array) {
        return crypto.encryptChaCha(data);
    }

    async decryptFile(fileData: Uint8Array, header: Uint8Array, key: string) {
        return crypto.decryptChaCha(fileData, header, key);
    }

    async fromB64(string: string) {
        return crypto.fromB64(string);
    }

    async encryptMetadata(data: unknown, key: string) {
        return crypto.encryptMetadataJSON({
            jsonValue: data,
            keyB64: key,
        });
    }

    async decryptMetadata(data: string, decryptionHeader: string, key: string) {
        return crypto._decryptMetadataJSON({
            encryptedDataB64: data,
            decryptionHeaderB64: decryptionHeader,
            keyB64: key,
        });
    }
}

expose(CryptoWorker);
