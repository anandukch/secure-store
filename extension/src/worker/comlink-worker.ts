import { expose, wrap, type Remote } from "comlink";

export class ComlinkWorker<T extends new () => InstanceType<T>> {
    /** The class (T) exposed by the web worker */
    public remote: Promise<Remote<InstanceType<T>>>;
    /** The web worker */
    public worker: Worker;
    /** An arbitrary name associated with this ComlinkWorker for debugging. */
    private name: string;

    constructor(name: string, worker: Worker) {
        this.name = name;
        this.worker = worker;

        worker.onerror = (event) => {
            console.error(`Error in ${name} web worker:`, event);
        };
        console.log(`Created ${name} web worker`);
        const comlink = wrap<T>(worker);
        this.remote = new comlink() as Promise<Remote<InstanceType<T>>>;
        expose(worker);
    }

    public terminate() {
        this.worker.terminate();

        console.log(`Terminated ${this.name} web worker`);
    }
}
