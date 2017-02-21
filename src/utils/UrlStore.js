/**
 * Created by chzellot on 21.02.17.
 */

let urlStore = {
    log: 'http://localhost:300/log',
    loadLog: 'http://localhost:300/list',
    loadSessions: 'http://localhost:300/listsessions',
};

export function prepareUrls(window) {
    if (!(typeof window.GLOBAL_URLS == 'undefined')) {
        Object.assign({}, urlStore, window.GLOBAL_URLS);
    }
    return () => {
        return urlStore;
    }
}
