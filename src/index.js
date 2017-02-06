import React from "react";
import ReactDOM from "react-dom";
import replayApp from "./reducers/index";
import {App} from "./components/App";
import "./index.css";
import "./external/css/bootstrap.css";
import {Provider} from "react-redux";
import {createStore} from "redux";
import configureStore from "./configureStore";


const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);