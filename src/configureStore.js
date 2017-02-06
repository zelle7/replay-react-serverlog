/**
 * Created by chzellot on 06.02.17.
 */
import {REPLAY, REPLAY as RECORDING} from "./constants";
import replayApp from './reducers/index';
import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

const loggerMiddleware = createLogger();
const ignoreActions = [REPLAY.START, REPLAY.START, REPLAY.STOP, RECORDING.START];
const asyncLogger = configureAsyncLogger(5, ignoreActions, ignoreActions, 'http://localhost:4567/log');

export default function configureStore(initialState) {
    return createStore(
        replayApp,
        initialState,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware,
            asyncLogger,
        )
    )
}




function configureAsyncLogger(maxCacheLog, ignoreActions, sendOnActions, fetchUrl){
    let cacheLog = [];
    let statData = {
        lastActionTime: null,
        actionTime: null,
    };
    return store => next => action => {
        let result = next(action);
        if(store.getState().replay.recording){
            if(ignoreActions.indexOf(action.type) === -1) {
                statData.lastActionTime = statData.actionTime;
                statData.actionTime = new Date();
                let jsonData = {log: JSON.stringify(Object.assign({}, result, {statData})), timestamp: new Date().getTime()};
                cacheLog.push(jsonData);
            } else {
                console.log("ignore type " + action.type);
            }
            if(cacheLog.length === maxCacheLog || ignoreActions.indexOf(action.type) !== -1) {
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