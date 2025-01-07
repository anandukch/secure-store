import { StorageEnum } from "../common/enum";
import { encryptBoxB64, encryptMetadata, generateEncryptionKey } from "../crypto/crypto";
import { BaseService } from "./base";
import { browserService } from "./browser";
import { fetchService } from "./fetch";

export type SecretType = {
    username?: string;
    password?: string;
    email?: string;
};

export type VaultType = {
    projectId: string;
    siteUrl: string;
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
    VAULT_ENDPOINT = "/vaults";
    public async uploadSecret({ projectId, siteUrl, secrets }: VaultType) {
        // const worker = await this.checkHealth();
        console.log("vault service", secrets);

        const secretKey = await generateEncryptionKey();
        const data = await browserService.getData("masterKey", StorageEnum.LOCAL);
        console.log("master key", data);

        const masterKey = data ? data.masterKey : undefined;
        if (!masterKey) {
            throw new Error("Master key not found");
        }
        const encryptedSecretKey = await encryptBoxB64(secretKey, masterKey);
        const encryptedSecrets = await encryptMetadata(secrets, secretKey);
        const vaultRequest = {
            projectId,
            siteUrl: siteUrl,
            encryptedKey: encryptedSecretKey.encryptedData,
            keyDecryptionNonce: encryptedSecretKey.nonce,
            encryptedMetadata: encryptedSecrets.encryptedDataB64,
            metadataDecryptionHeader: encryptedSecrets.decryptionHeaderB64,
        };
        const vaultResponse = await this.createVaultApi(vaultRequest);
        if (vaultResponse.status === 401) {
            // await browserService.removeAllData(StorageEnum.LOCAL);
        }
        return await vaultResponse.json();
    }

    private async createVaultApi(vaultRequest: VaultRequest) {
        return await fetchService.post(this.VAULT_ENDPOINT, vaultRequest);
    }
    public async getSecretApi() {
        return await fetchService.get(this.VAULT_ENDPOINT);
    }
}

export const vaultService = new VaultService();
