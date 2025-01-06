import { sharedCryptoWorker } from "../crypto";
import { CryptoWorker } from "../crypto/worker";

export interface Initializable {
    init(): Promise<void>;
    checkHealth(): void;
    ensure<T>(v: T | null | undefined): T;
}

export abstract class BaseService implements Initializable {
    protected healthy = false;
    protected worker: CryptoWorker | undefined;

    async init(): Promise<void> {
        this.worker = await sharedCryptoWorker();
        this.healthy = true;
    }

    async checkHealth() {
        console.log("Checking health...");
        console.log(this.healthy);

        if (!this.healthy) {
            try {
                await this.init();
            } catch (e) {
                console.log("Failed to initialize service", e);

                throw new Error("Service not initialized. Call `init` first.");
            }
        }

        return this.ensure(this.worker);
    }

    ensure = <T>(v: T | null | undefined): T => {
        if (v === null) throw new Error("Required value was null");
        if (v === undefined) throw new Error("Required value was undefined");
        return v;
    };
}
