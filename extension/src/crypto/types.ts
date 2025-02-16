export interface B64EncryptionResult {
    encryptedData: string;
    key: string;
    nonce: string;
}
export type BytesOrB64 = Uint8Array | string;

export interface EncryptedBox {
    encryptedData: BytesOrB64;

    nonce: BytesOrB64;
}

export interface EncryptedBoxB64 {
    encryptedData: string;

    nonce: string;
}

export interface EncryptedBlobB64 {
    encryptedData: string;

    decryptionHeader: string;
}

export interface EncryptedBlobBytes {
    encryptedData: Uint8Array;

    decryptionHeader: Uint8Array;
}

export interface FileStream {
    stream: ReadableStream<Uint8Array>;

    chunkCount: number;

    fileSize: number;

    lastModifiedMs: number;

    file?: File;
}

export interface EncryptedBlob {
    encryptedData: BytesOrB64;

    decryptionHeader: BytesOrB64;
}
