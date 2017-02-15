/**
 * Created by chzellot on 07.02.17.
 */
export function configureAsyncLogger(maxCacheLog, ignoreActions, sendOnActions, fetchUrl){
    let cacheLog = [];
    let statData = {
        lastActionTime: null,
        actionTime: null,
    };
    return store => next => action => {
        let result = next(action);
        if(store.getState().replay.recording || sendOnActions.indexOf(action.type) !== -1){
            if(ignoreActions.indexOf(action.type) === -1) {
                statData.lastActionTime = statData.actionTime;
                statData.actionTime = new Date();
                let jsonData = {log: JSON.stringify(Object.assign({}, result, {statData})), timestamp: new Date().getTime()};
                cacheLog.push(jsonData);
            } else {
                console.log("ignore type " + action.type);
            }
            if(cacheLog.length === maxCacheLog || sendOnActions.indexOf(action.type) !== -1) {
                let tmpCacheLog = JSON.stringify(cacheLog);
                cacheLog = []; //reset cache
                fetch(fetchUrl, {
                    method: 'POST',
                    credentials: 'include',
                    headers: new Headers({'Content-Type': 'application/json'}),
                    mode: 'no-cors',
                    body: tmpCacheLog
                })
                    .then(function (serverResp) {
                        //console.log("log server responded with " + serverResp);
                    }).catch(function (err) {
                    console.warn("log server responded with " + err);
                });
            }
        }
        return result;
    }
};