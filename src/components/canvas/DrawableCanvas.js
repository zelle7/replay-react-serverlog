/**
 * Created by chzellot on 15.02.17.
 */
import React, {Component, PropTypes} from "react";
import ReactDOM from "react-dom";
import {CANVAS} from "../../constants";
import {connect} from "react-redux";

/**
 * modified version from
 * https://github.com/jonhni/react-drawable-canvas-example/blob/master/src/components/DrawableCanvas.jsx
 *
 * TODO: register redux actions for draw start draw end .. draw with props?
 */
class DrawableCanvasContainer extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
        this.handleOnMouseMove = this.handleOnMouseMove.bind(this);
        this.handleonMouseUp = this.handleonMouseUp.bind(this);
        this.draw = this.draw.bind(this);
        this.canvasStyle = this.canvasStyle.bind(this);
        this.isMobile = this.isMobile.bind(this);
        this.resetCanvas = this.resetCanvas.bind(this);
        this.state = {
            canvas: null,
            context: null,
        };
    }


    componentDidMount() {
        let canvas = ReactDOM.findDOMNode(this);

        canvas.style.width = '500px';
        canvas.style.height = '500px';
        canvas.style.border = '1px solid black';
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        let ctx = canvas.getContext('2d');

        this.setState({
            canvas: canvas,
            context: ctx
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.reset) {
            this.resetCanvas();
            this.props.dispatch({type: CANVAS.RESET_DONE, data: {}})
        }
        if (nextProps.drawing && !nextProps.drawn) {
            let lastX = nextProps.lastX;
            let lastY = nextProps.lastY;
            let currentX = nextProps.currentX;
            let currentY = nextProps.currentY;
            this.state.context.beginPath();
            this.draw(lastX, lastY, currentX, currentY);
            this.props.dispatch({type: CANVAS.DRAWN, data: null})
        }
    }

    handleOnMouseDown(e) {
        let rect = this.state.canvas.getBoundingClientRect();
        console.log(rect);
        let currentX = (this.isMobile() ? e.targetTouches[0].pageX : e.clientX ) - rect.left;
        let currentY = (this.isMobile() ? e.targetTouches[0].pageY : e.clientY ) - rect.top;
        this.props.dispatch({
            type: CANVAS.MOUSE_DOWN,
            data: {
                lastX: currentX,
                lastY: currentY,
                currentX: currentX,
                currentY: currentY,
                drawing: true,
                drawn: false
            }
        });
    }

    handleOnMouseMove(e) {

        if (this.props.drawing) {
            let rect = this.state.canvas.getBoundingClientRect();
            let lastX = this.props.lastX;
            let lastY = this.props.lastY;
            let currentX = (this.isMobile() ? e.targetTouches[0].pageX : e.clientX ) - rect.left;
            let currentY = (this.isMobile() ? e.targetTouches[0].pageY : e.clientY ) - rect.top;

            this.props.dispatch({
                type: CANVAS.MOUSE_MOVE,
                data: {lastX: lastX, lastY: lastY, currentX: currentX, currentY: currentY, drawn: false}
            });
        }
    }

    handleonMouseUp() {
        this.props.dispatch({type: CANVAS.MOUSE_UP, data: {drawing: false}})
    }

    draw(lX, lY, cX, cY) {
        // eslint-disable-next-line
        this.state.context.strokeStyle = this.props.brushColor;
        // eslint-disable-next-line
        this.state.context.lineWidth = this.props.lineWidth;
        // eslint-disable-next-line
        this.state.context.moveTo(lX, lY);
        // eslint-disable-next-line
        this.state.context.lineTo(cX, cY);
        // eslint-disable-next-line
        this.state.context.stroke();
    }

    resetCanvas() {
        let width = this.state.context.canvas.width;
        let height = this.state.context.canvas.height;
        this.state.context.clearRect(0, 0, width, height);
    }

    getDefaultStyle() {
        return {
            backgroundColor: '#FFFFFF',
            cursor: 'pointer'
        };
    }

    canvasStyle() {
        let defaults = this.getDefaultStyle();
        let custom = this.props.canvasStyle;
        return Object.assign({}, defaults, custom);
    }

    isMobile() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return true;
        }
        return false;
    }

    render() {
        return (
            <canvas style={this.canvasStyle()}
                    onMouseDown={this.handleOnMouseDown}
                    onTouchStart={this.handleOnMouseDown}
                    onMouseMove={this.handleOnMouseMove}
                    onTouchMove={this.handleOnMouseMove}
                    onMouseUp={this.handleonMouseUp}
                    onTouchEnd={this.handleonMouseUp}
            >
            </canvas>
        );
    }

}

DrawableCanvasContainer.propTypes = {
    brushColor: PropTypes.string.isRequired,
    lineWidth: PropTypes.number.isRequired,
    canvasStyle: PropTypes.shape({
        backgroundColor: PropTypes.string,
        cursor: PropTypes.string
    }),
    clear: PropTypes.bool
};

DrawableCanvasContainer.defaultProps = {
    brushColor: 'rgba(0,0,0,1)',
    lineWidth: 4,
    canvasStyle: {
        backgroundColor: '#FFFFFF',
        cursor: 'pointer'
    },
    clear: false

};


const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch
    }
};

const mapStateToProps = (state) => {
    return state.canvas;
};

const DrawableCanvas = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DrawableCanvasContainer);

export default DrawableCanvas;