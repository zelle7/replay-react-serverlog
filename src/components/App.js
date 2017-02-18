import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import "./App.css";
import {RECORDING, CANVAS} from "../constants";
import Controls from "./replay/controls";
import CursorIndicators from "./replay/CursorIndicators";
import DrawableCanvas from "./canvas/DrawableCanvas";
import {SketchPicker} from "react-color";

class AppContainer extends Component {
    constructor(props, context) {
        super(props, context);
        this.onRecordingClick = this.onRecordingClick.bind(this);
    }

    onRecordingClick(e) {
        let type = this.props.replay.recording ? RECORDING.STOP : RECORDING.START;
        this.props.dispatch({type: type, data: {}});
    }


    render() {
        const {recording, replay} = this.props.replay;
        return (
            <div className="App" onClick={this.props.clickPosition}>
                <div style={{textAlign: 'center', margin: '25px'}}>
                    <Controls replay={replay} recording={recording} onReplayClick={this.props.onReplayClick}
                              onRecordingClick={this.onRecordingClick}/>
                </div>
                <div style={{float: 'left', marginLeft: '15px'}}>
                    <SketchPicker onChangeComplete={this.props.brushColorChange} color={this.props.canvas.brushColor}/>
                    <button style={{margin: '25px'}} className="btn btn-default" onClick={this.props.resetCanvas}>Reset Canvas</button>
                </div>
                <div style={{textAlign: 'center'}}>
                    <DrawableCanvas brushColor={this.props.canvas.brushColor} lineWidth={this.props.canvas.brushSize}/>
                </div>
                {this.props.replay.replay ? <CursorIndicators cursorPositions={this.props.positions.cursor}
                                                              clickPositions={this.props.positions.clicks}/> : null}
            </div>
        );
    }
}

AppContainer.propTypes = {
    onReplayClick: PropTypes.func.isRequired,
    clickPosition: PropTypes.func.isRequired
};
const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {
        resetCanvas: (e) => {
            dispatch({type: CANVAS.RESET, data: {reset: true}});
        },
        brushColorChange: (color, event) => {
            let rgba = 'rgba('+color.rgb.r+','+color.rgb.g+','+color.rgb.b+','+color.rgb.a+')';
            dispatch({type: CANVAS.CHANGE_COLOR, color: rgba});
        },

        dispatch: dispatch
    }
};


export const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);