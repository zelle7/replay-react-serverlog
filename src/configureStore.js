/**
 * Created by chzellot on 06.02.17.
 */
import {REPLAY, RECORDING} from "./constants";
import replayApp from './reducers/index';
import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

const loggerMiddleware = createLogger();

export default function configureStore(initialState, tokenStoreMiddleware, asyncLogger) {
    return createStore(
        replayApp,
        initialState,
        applyMiddleware(
            tokenStoreMiddleware,
            thunkMiddleware,
            loggerMiddleware,
            asyncLogger,
        )
    )
}




