import zxcvbn from "zxcvbn";

import { BaseService } from "./base";
import { login, signup } from "../axios";

export interface UserAttributesType {
    encryptedData: string;
    nonce: string;
    salt: string;
    kekOpsLimit: number;
    kekMemLimit: number;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: "admin" | "user";
}

export type LoginResponse = {
    user: User;
} & UserAttributesType;
export class AuthService extends BaseService {
    public async initLogin(email: string, password: string) {
        const worker = await this.checkHealth();
        const res = await login({ email, password });
        const { data }: { data: UserAttributesType } = res.data;

        const key = await worker.deriveKey(password, data.salt, data.kekOpsLimit, data.kekMemLimit);
        const masterKey = await worker.decryptBoxB64(
            {
                encryptedData: data.encryptedData,
                nonce: data.nonce,
            },
            key,
        );

        return { masterKey, data };
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
            encrypedMasterKey: masterKeyEncryptedWithKek.encryptedData,
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
}

export const authService = new AuthService();
