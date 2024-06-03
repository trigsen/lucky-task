import {Signal} from "signal-polyfill";

let needsEnqueue = true;

const watcher = new Signal.subtle.Watcher(() => {
    if (needsEnqueue) {
        needsEnqueue = false;
        queueMicrotask(processPending);
    }
});

function processPending() {
    needsEnqueue = true;

    for (const s of watcher.getPending()) {
        s.get();
    }

    watcher.watch();
}

export function effect(callback) {
    let cleanup;

    const computed = new Signal.Computed(() => {
        typeof cleanup === "function" && cleanup();
        cleanup = callback();
    });

    watcher.watch(computed);
    computed.get();

    return () => {
        watcher.unwatch(computed);
        typeof cleanup === "function" && cleanup();
    };
}
