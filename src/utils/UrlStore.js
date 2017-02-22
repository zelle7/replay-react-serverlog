/**
 * Created by chzellot on 21.02.17.
 */

let urlStore = {
    log: 'http://localhost:3000/log',
    loadLog: 'http://localhost:4567/list',
    loadSessions: 'http://localhost:4567/listsesssions',
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
