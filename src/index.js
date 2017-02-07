import React from "react";
import ReactDOM from "react-dom";
import replayApp from "./reducers/index";
import {App} from "./components/App";
import "./index.css";
import "./external/css/bootstrap.css";
import {Provider} from "react-redux";
import {createStore} from "redux";
import configureStore from "./configureStore";
import {trackCursorPosition, restoreHistory} from './utils/autoplay';

const store = configureStore();
const useHistory = restoreHistory(store, 'http://localhost:4567/list', null);
ReactDOM.render(
    <Provider store={store}>
        <App trackCursorPosition={trackCursorPosition(store, 200)} onReplayClick={useHistory} />
    </Provider>,
    document.getElementById('root')
);

