/**
 * Created by chzellot on 21.02.17.
 */

let urlStore = {
    log: '/api/log',
    loadLog: '/api/list',
    loadSessions: '/api/listsessions',
};

let preparedUrlStore = null;
export function prepareUrls(window) {
    if (!(typeof window.GLOBAL_URLS === 'undefined')) {
        preparedUrlStore = Object.assign({}, urlStore, window.GLOBAL_URLS);
    } else {
        preparedUrlStore = Object.assign({}, urlStore);
    }
    return preparedUrlStore;
}
