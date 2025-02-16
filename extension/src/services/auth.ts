import zxcvbn from "zxcvbn";

import { BaseService } from "./base";
import { getUserAttributes, login, signup } from "../axios";

export interface UserAttributesType {
    email: string;
    encryptedMasterKey: string;
    encryptedPrivateKey: string;
    kekMemLimit: number;
    kekOpsLimit: number;
    keyDecryptionNonce: string;
    keyDecryptionSalt: string;
    name: string;
    publicKey: string;
    recoveryCode: string | null;
    _id: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: "admin" | "user";
}

export type LoginResponse = {
    token: string;
} & UserAttributesType;
export class AuthService extends BaseService {
    public async initLogin(email: string, password: string) {
        const worker = await this.checkHealth();
        const res = await getUserAttributes({ email });
        const { data }: { data: UserAttributesType } = res.data;

        const key = await worker.deriveKey(password, data.keyDecryptionSalt, data.kekOpsLimit, data.kekMemLimit);

        const masterKey = await worker.decryptBoxB64(
            {
                encryptedData: data.encryptedMasterKey,
                nonce: data.keyDecryptionNonce,
            },
            key,
        );

        return { masterKey, data };
    }

    public async completeLogin(email: string) {
        const res = await login({ email });

        const { data }: { data: LoginResponse } = res.data;
        return data;
    }

    public async loginUser({ email, password }: { email: string; password: string }) {
        const userAttributes = await this.initLogin(email, password);
        console.log("User attributes:", userAttributes);

        if (!userAttributes) {
            throw new Error("Error getting user attributes");
        }

        console.log("User attributes:", userAttributes);

        const data = await this.completeLogin(email);
        if (!data) {
            throw new Error("Error completing login");
        }
        return {
            token: data.token,
            email: userAttributes.data.email,
            name: userAttributes.data.name,
            masterKey: userAttributes.masterKey,
        };
    }

    public static checkPasswordStrength(password: string) {
        return zxcvbn(password);
    }

    public async register(name: string, email: string, password: string, rePassword: string) {
        if (password !== rePassword) {
            throw new Error("Passwords do not match");
        }

        // const strength = AuthService.checkPasswordStrength(password);
        // if (strength.score < 3) {
        //     throw new Error("Password is too weak");
        // }

        const worker = await this.checkHealth();
        console.log("started registration");

        const masterKey = await worker.generateEncryptionKey();
        console.log("Master key generated");

        const kekSalt = await worker.generateSaltToDeriveKey();
        console.log("KEK salt generated");

        const kek = await worker.deriveSensitiveKey(password, kekSalt);
        const masterKeyEncryptedWithKek = await worker.encryptBoxB64(masterKey, kek.key);

        const { publicKey, privateKey } = await worker.generateKeyPair();
        const privateKeyEncryptedWithMasterKey = await worker.encryptToB64(privateKey, masterKey);

        // Store the master key in a secure place
        console.log("Master key:", masterKey);

        const requestBody = {
            email: email,
            name: name,
            encryptedMasterKey: masterKeyEncryptedWithKek.encryptedData,
            keyDecryptionNonce: masterKeyEncryptedWithKek.nonce,
            keyDecryptionSalt: kekSalt,
            kekOpsLimit: kek.opsLimit,
            kekMemLimit: kek.memLimit,
            publicKey: publicKey,
            encryptedPrivateKey: privateKeyEncryptedWithMasterKey.encryptedData,
            privateKeyDecryptionNonce: privateKeyEncryptedWithMasterKey.nonce,
        };

        // to be sent to backend
        console.log("Registration data:", requestBody);

        signup(requestBody).then((res) => {
            console.log("Registration response:", res);
        });

        // console.log("Encrypted data:", encryptedData);
    }

    public async getMasterKeyFromLocalStorage() {
        const masterKey = await this.checkHealth();
        return masterKey;
    }
}

export const authService = new AuthService();
