import React from "react";
import ReactDOM from "react-dom";
import replayApp from "./reducers/index";
import {App} from "./components/App";
import "./index.css";
import "./external/css/bootstrap.css";
import ReactCursorPosition from 'react-cursor-position'
import {Provider} from "react-redux";
import {createStore} from "redux";
import configureStore from "./configureStore";
import {trackCursorPosition, restoreHistory} from './utils/autoplay';
import {REPLAY} from "./constants";

const store = configureStore();
const useHistory = restoreHistory(store, 'http://localhost:4567/list', null);

const replayFunction = function(){
    if(!store.getState().replay.replay){
        return useHistory();
    } else {
        store.dispatch({type: REPLAY.STOP, data: {}});
    }
};
ReactDOM.render(
    <Provider store={store}>
        <ReactCursorPosition onCursorPositionChanged={trackCursorPosition(store, 50)}>
        <App onReplayClick={replayFunction} />
        </ReactCursorPosition>
    </Provider>,
    document.getElementById('root')
);

