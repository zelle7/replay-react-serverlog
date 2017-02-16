/**
 * Created by chzellot on 06.02.17.
 */
import {REPLAY, RECORDING} from "./constants";
import replayApp from './reducers/index';
import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import {configureAsyncLogger} from './utils/asyncLogger';

const loggerMiddleware = createLogger();
const ignoreActions = [REPLAY.START, REPLAY.START, RECORDING.STOP, RECORDING.START];
const sendOnActions = [RECORDING.STOP];
const asyncLogger = configureAsyncLogger(10, ignoreActions, sendOnActions, 'http://localhost:4567/log');

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




