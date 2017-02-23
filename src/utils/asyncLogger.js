/**
 * Created by chzellot on 07.02.17.
 */
/**
 * async logger method. hooks in all actions and sends them to the log-server. Caches an configured amount of entries,
 * before it sends the data to the server. An array of objects can be given to ignore actions and trigger the sending
 * action. The of the current session will be appended to the called url (?token=uuid). Should be used as a Redux
 * Middleware.
 *
 * The actual data will be stringified (@see JSON#stringify) and stored in the field log, together with some meta data
 * and will be added and send to the server (lastActionTime: Timestamp of the action before this action,
 * actionTime: Timestamp of the actual action)
 *
 * This would be the place if you want to store the data on other places (e.g. locally)
 *
 * @param maxCacheLog - number of log entries which will be cached before the logs will be send to the server
 * @param ignoreActions - these actions will not be send to the server should be stuff like recording start etc
 * @param sendOnActions - these action will trigger an immediate sending (should be things like recording stopped)
 * @param fetchUrl - url which will be used to call the server
 * @returns {function(*=): function(*): function(*=)}
 */
export function configureAsyncLogger(maxCacheLog, ignoreActions, sendOnActions, fetchUrl) {
    let cacheLog = [];
    let statData = {
        lastActionTime: null,
        actionTime: null,
        bodyHeight: window.document.body.style.height,
        bodyWidth: window.document.body.style.width,
    };
    return store => next => action => {
        let result = next(action);
        if (store.getState().replay.recording || sendOnActions.indexOf(action.type) !== -1) {
            if (ignoreActions.indexOf(action.type) === -1) {
                let bodyEl = window.document.body;
                statData.bodyHeight = bodyEl.style.height;
                statData.bodyWidth = bodyEl.style.width;
                statData.lastActionTime = statData.actionTime;
                statData.actionTime = new Date();
                //stringifies the actual data
                let jsonData = {
                    log: JSON.stringify(Object.assign({}, result, {statData})),
                    timestamp: new Date().getTime()
                };
                console.log(jsonData);
                cacheLog.push(jsonData);
            } else {
                console.log("ignore type " + action.type);
            }
            if (cacheLog.length === maxCacheLog || sendOnActions.indexOf(action.type) !== -1) {
                let tmpCacheLog = JSON.stringify(cacheLog);
                cacheLog = []; //reset cache
                let urlCombined = fetchUrl + '?token=' + store.getState().replay.activeSession;
                fetch(urlCombined, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: tmpCacheLog
                })
                    .then(function (serverResp) {
                        //console.log("log server responded with " + serverResp);
                        //ignore the response here if you want to show some indicator of saving this would be the place for it
                    }).catch(function (err) {
                    console.warn("log server responded with " + err);
                });
            }
        }
        return result;
    }
};