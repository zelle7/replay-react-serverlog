import React, {Component} from 'react';
import ReactCursorPosition from 'react-cursor-position'
import { connect } from 'react-redux'
import logo from './logo.svg';
import './App.css';
import {ACTION_POSITION, RECORDING, REPLAY} from "../constants";
import Controls from './replay/controls';

class AppContainer extends Component {
    constructor(props, context){
        super(props, context);
        this.onRecordingClick = this.onRecordingClick.bind(this);
        this.onReplayClick = this.onReplayClick.bind(this);
    }

    onRecordingClick(e) {
        let type = this.props.replay.recording ? RECORDING.STOP : RECORDING.START;
        console.log(RECORDING);
        this.props.dispatch({type: type, data: {}});
    }

    onReplayClick(e) {
        let type = this.props.replay.replay ? REPLAY.STOP : REPLAY.START;
        this.props.dispatch({type: type, data: {}});
    }


    render() {
        const {recording, replay} = this.props.replay;
        return (
            <div className="App" onClick={this.props.clickPosition}>
                <ReactCursorPosition onCursorPositionChanged={this.props.trackCursorPosition}>
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h2>Welcome to React</h2>
                    </div>
                    <p className="App-intro">asdf
                        To get started, edit <code>src/App.js</code> and save to reload.
                    </p>
                    <Controls replay={replay} recording={recording} onReplayClick={this.onReplayClick} onRecordingClick={this.onRecordingClick}/>
                </ReactCursorPosition>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {
        trackCursorPosition: (cursorPosition) => {
            dispatch({type: ACTION_POSITION.MOVE, data: {x: cursorPosition.x, y: cursorPosition.y}})
        },
        clickPosition: (e) => {
            dispatch({type: ACTION_POSITION.CLICK, data: {x: e.screenX, y: e.screenY}})
        },
        dispatch : dispatch
    }
};

export const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);