import React from "react";
import ReactDOM from "react-dom";
import {App} from "./components/App";
import "./index.css";
import "./external/css/bootstrap.css";
import ReactCursorPosition from "react-cursor-position";
import {Provider} from "react-redux";
import configureStore from "./configureStore";
import {trackCursorPosition, trackClickPosition, restoreHistory} from "./utils/autoplay";
import {REPLAY} from "./constants";
import {getTokenStore} from "./utils/tokenStore";


const store = configureStore();
const useHistory = restoreHistory(store, 'http://localhost:4567/list', null, getTokenStore());

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
            <App onReplayClick={replayFunction} clickPosition={trackClickPosition(store.dispatch)}
                 sessionList={sessionList} activeSession={getTokenStore().get()}/>
        </ReactCursorPosition>
    </Provider>,
    document.getElementById('root')
);

