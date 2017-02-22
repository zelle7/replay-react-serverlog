/**
 * Created by chzellot on 06.02.17.
 */
import replayApp from "./reducers/index";
import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";
import {REPLAY, RECORDING, SESSIONLIST} from "./constants";
import {configureAsyncLogger} from "./utils/asyncLogger";
import {prepareUrls} from "./utils/UrlStore";

const loggerMiddleware = createLogger();
const ignoreActions = [REPLAY.START, REPLAY.START, RECORDING.STOP, RECORDING.START, SESSIONLIST.FETCHED, SESSIONLIST.FETCHING, SESSIONLIST.CHANGE_ACTIVE];
const sendOnActions = [RECORDING.STOP];
const urlStore = prepareUrls(window);
const asyncLogger = configureAsyncLogger(10, ignoreActions, sendOnActions, urlStore.log);


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




