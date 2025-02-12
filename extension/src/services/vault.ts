import { StorageEnum } from "../common/enum";
import { decryptBoxB64, decryptMetadata, encryptBoxB64, encryptMetadata, generateEncryptionKey } from "../crypto/crypto";
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
    secrets: any;
};
export type VaultRequest = {
    projectId: string;
    siteUrl: string;
    encryptedKey: string;
    keyDecryptionNonce: string;
    encryptedMetadata: string;
    metadataDecryptionHeader: string;
};

export type VaultResponse = {
    userId: string;
} & VaultRequest;
export class VaultService {
    VAULT_ENDPOINT = "/vaults";
    public async uploadSecret({ projectId, siteUrl, secrets }: VaultType) {
        // const worker = await this.checkHealth();

        const secretKey = await generateEncryptionKey();
        const data = await browserService.getData("masterKey", StorageEnum.LOCAL);

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
    public async getSecretApi(siteUrl: string, projectId: string) {
        return await fetchService.get(`${this.VAULT_ENDPOINT}?siteUrl=${siteUrl}&projectId=${projectId}`);
    }

    public async decryptSecrets(encryptedVaults: VaultResponse[] = []) {
        console.log(" encryptedVaults", encryptedVaults);

        const masterKey = await browserService.getData("masterKey", StorageEnum.LOCAL);
        if (!masterKey) {
            throw new Error("Master key not found");
        }
        const decryptedSecrets = await Promise.all(
            encryptedVaults.map(async (encryptedVault) => {
                return await this.decryptSecretsData(encryptedVault, masterKey.masterKey);
            }),
        );
        console.log("decrypted secrets", decryptedSecrets);
        return decryptedSecrets;
    }

    private async decryptSecretsData(secrets: VaultResponse, masterKey: string) {
        const secretKey = await decryptBoxB64(
            {
                encryptedData: secrets.encryptedKey,
                nonce: secrets.keyDecryptionNonce,
            },
            masterKey,
        );

        const decryptedSecrets = await decryptMetadata(secrets.encryptedMetadata, secrets.metadataDecryptionHeader, secretKey);
        console.log("decrypted secrets", decryptedSecrets);
        return decryptedSecrets;
    }
}

export const vaultService = new VaultService();
