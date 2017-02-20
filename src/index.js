import React from "react";
import ReactDOM from "react-dom";
import {App} from "./components/App";
import "./index.css";
import "./external/css/bootstrap.css";
import ReactCursorPosition from "react-cursor-position";
import {Provider} from "react-redux";
import configureStore from "./configureStore";
import {trackCursorPosition, trackClickPosition, restoreHistory} from "./utils/autoplay";
import {REPLAY, RECORDING} from "./constants";
import TokenStore, {tokenStoreMiddleware} from "./utils/tokenStore";
import {configureAsyncLogger} from "./utils/asyncLogger";

const tokenStore = new TokenStore();
const ignoreActions = [REPLAY.START, REPLAY.START, RECORDING.STOP, RECORDING.START];
const sendOnActions = [RECORDING.STOP];
const asyncLogger = configureAsyncLogger(10, ignoreActions, sendOnActions, 'http://localhost:4567/log', tokenStore);
const tokenstMiddlware = tokenStoreMiddleware(tokenStore);

const store = configureStore({}, tokenstMiddlware, asyncLogger);
const useHistory = restoreHistory(store, 'http://localhost:4567/list', null, tokenStore);

const replayFunction = function () {
    if (!store.getState().replay.replay) {
        return useHistory();
    } else {
        store.dispatch({type: REPLAY.STOP, data: {}});
    }
};

const sessionList = ["test1", "test2", "test3"];

ReactDOM.render(
    <Provider store={store}>
        <ReactCursorPosition onCursorPositionChanged={trackCursorPosition(store, 50)}>
            <App onReplayClick={replayFunction} clickPosition={trackClickPosition(store.dispatch)} sessionList={sessionList} activeSession={tokenStore.get()}/>
        </ReactCursorPosition>
    </Provider>,
    document.getElementById('root')
);

