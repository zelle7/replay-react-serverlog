import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import "./App.css";
import {RECORDING, CANVAS, SESSIONLIST} from "../constants";
import Controls from "./replay/controls";
import CursorIndicators from "./replay/CursorIndicators";
import SessionList from "./replay/SessionList";
import VideoPlayer from "./player/VideoPlayer";
import {SketchPicker} from "react-color";

class AppContainer extends Component {
    constructor(props, context) {
        super(props, context);
        this.onRecordingClick = this.onRecordingClick.bind(this);
    }

    onRecordingClick(e) {
        let type = this.props.replay.recording ? RECORDING.STOP : RECORDING.START;
        this.props.dispatch({type: type, data: {}});
        this.props.fetchSessions();
    }

    componentDidMount() {
        this.props.fetchSessions();
    }

    render() {
        const {recording, replay, sessions, activeSession} = this.props.replay;
        return (
            <div className="App" onClick={this.props.clickPosition}>
                <div style={{textAlign: 'center', margin: '25px'}}>
                    <Controls replay={replay} recording={recording} onReplayClick={this.props.onReplayClick}
                              onRecordingClick={this.onRecordingClick}/>
                </div>
                <div style={{float: 'left', marginLeft: '15px'}}>
                    <SessionList sessions={sessions}
                                 onSessionClick={this.props.onSessionClick}
                                 activeSession={activeSession}/>
                </div>
                <div style={{textAlign: 'center'}}>
                    <VideoPlayer />
                </div>
                {replay ? <CursorIndicators cursorPositions={this.props.positions.cursor}
                                            clickPositions={this.props.positions.clicks}/> : null}
            </div>
        );
    }
}

AppContainer.propTypes = {
    onReplayClick: PropTypes.func.isRequired,
    clickPosition: PropTypes.func.isRequired,
    fetchSessions: PropTypes.func.isRequired,
    activeSession: PropTypes.string,
};
const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSessionClick: (token) => {
            dispatch({type: SESSIONLIST.CHANGE_ACTIVE, session: token});
        },

        dispatch: dispatch
    }
};


export const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);