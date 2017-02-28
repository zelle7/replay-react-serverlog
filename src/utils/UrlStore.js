/**
 * Created by chzellot on 21.02.17.
 */

let urlStore = {
    log: process.env.REACT_APP_API_URL + '/api/log',
    loadLog: process.env.REACT_APP_API_URL + '/api/list',
    loadSessions: process.env.REACT_APP_API_URL + '/api/listrecordings',
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
