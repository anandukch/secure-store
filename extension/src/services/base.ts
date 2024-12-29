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
    if (!this.healthy) {
      try {
        await this.init();
      } catch {
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
