/**
 * Created by chzellot on 06.02.17.
 */
import replayApp from "./reducers/index";
import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";
import {REPLAY, RECORDING} from "./constants";
import {tokenStoreMiddleware, getTokenStore} from "./utils/tokenStore";
import {configureAsyncLogger} from "./utils/asyncLogger";

const loggerMiddleware = createLogger();
const tokenStore = getTokenStore();
const ignoreActions = [REPLAY.START, REPLAY.START, RECORDING.STOP, RECORDING.START];
const sendOnActions = [RECORDING.STOP];
const asyncLogger = configureAsyncLogger(10, ignoreActions, sendOnActions, 'http://localhost:4567/log', tokenStore);
const tokenstMiddlware = tokenStoreMiddleware(tokenStore);


export default function configureStore(initialState) {
    return createStore(
        replayApp,
        initialState,
        applyMiddleware(
            tokenstMiddlware,
            thunkMiddleware,
            loggerMiddleware,
            asyncLogger,
        )
    )
}




