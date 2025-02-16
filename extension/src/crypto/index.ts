import { ComlinkWorker } from "../worker/comlink-worker";
import { CryptoWorker } from "./worker";

let _comlinkWorker: ComlinkWorker<typeof CryptoWorker> | undefined;

export const sharedCryptoWorker = async () => (_comlinkWorker ??= createComlinkCryptoWorker()).remote;

export const createComlinkCryptoWorker = () =>
    new ComlinkWorker<typeof CryptoWorker>("crypto", new Worker(new URL("worker.ts", import.meta.url)));
