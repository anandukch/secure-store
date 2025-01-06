import { StorageEnum } from "../common/enum";
import { encryptBoxB64, encryptMetadata, generateEncryptionKey } from "../crypto/crypto";
import { BaseService } from "./base";
import { browserService } from "./browser";

export type SecretType = {
    siteUrl: string;
    username?: string;
    password?: string;
    email?: string;
};

export type VaultType = {
    projectId: string;
    secrets: SecretType;
};
export type VaultRequest = {
    projectId: string;
    siteUrl: string;
    encryptedKey: string;
    keyDecryptionNonce: string;
    encryptedMetadata: string;
    metadataDecryptionHeader: string;
};
export class VaultService {
    public async createSecret({ projectId, secrets }: VaultType): Promise<VaultRequest> {
        // const worker = await this.checkHealth();
        const secretKey = await generateEncryptionKey();
        const data = await browserService.getData("masterKey", StorageEnum.LOCAL);
        const masterKey = data ? data.masterKey : undefined;
        if (!masterKey) {
            throw new Error("Master key not found");
        }
        const encryptedSecretKey = await encryptBoxB64(secretKey, masterKey);
        const encryptedSecrets = await encryptMetadata(secrets, secretKey);
        return {
            projectId,
            siteUrl: secrets.siteUrl,
            encryptedKey: encryptedSecretKey.encryptedData,
            keyDecryptionNonce: encryptedSecretKey.nonce,
            encryptedMetadata: encryptedSecrets.encryptedDataB64,
            metadataDecryptionHeader: encryptedSecrets.decryptionHeaderB64,
        };
    }
}

export const vaultService = new VaultService();
