/**
 * Created by chzellot on 15.02.17.
 */
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

/**
 * modified version from
 * https://github.com/jonhni/react-drawable-canvas-example/blob/master/src/components/DrawableCanvas.jsx
 *
 */
class DrawableCanvas extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
        this.handleOnMouseMove = this.handleOnMouseMove.bind(this);
        this.handleonMouseUp = this.handleonMouseUp.bind(this);
        this.draw = this.draw.bind(this);
        this.canvasStyle = this.canvasStyle.bind(this);
        this.isMobile = this.isMobile.bind(this);
        this.resetCanvas = this.resetCanvas.bind(this);
    }


    getInitialState() {
        return {
            canvas: null,
            context: null,
            drawing: false,
            lastX: 0,
            lastY: 0,
            history: []
        };
    }

    componentDidMount() {
        let canvas = ReactDOM.findDOMNode(this);

        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        let ctx = canvas.getContext('2d');

        this.setState({
            canvas: canvas,
            context: ctx
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.clear) {
            this.resetCanvas();
        }
    }

    handleOnMouseDown(e) {
        let rect = this.state.canvas.getBoundingClientRect();
        this.state.context.beginPath();
        if (this.isMobile()) {
            this.setState({
                lastX: e.targetTouches[0].pageX - rect.left,
                lastY: e.targetTouches[0].pageY - rect.top
            });
        }
        else {
            this.setState({
                lastX: e.clientX - rect.left,
                lastY: e.clientY - rect.top
            });
        }

        this.setState({
            drawing: true
        });
    }

    handleOnMouseMove(e) {

        if (this.state.drawing) {
            let rect = this.state.canvas.getBoundingClientRect();
            let lastX = this.state.lastX;
            let lastY = this.state.lastY;
            let currentX;
            let currentY;
            if (this.isMobile()) {
                currentX = e.targetTouches[0].pageX - rect.left;
                currentY = e.targetTouches[0].pageY - rect.top;
            }
            else {
                currentX = e.clientX - rect.left;
                currentY = e.clientY - rect.top;
            }


            this.draw(lastX, lastY, currentX, currentY);
            this.setState({
                lastX: currentX,
                lastY: currentY
            });
        }
    }

    handleonMouseUp() {
        this.setState({
            drawing: false
        });
    }

    draw(lX, lY, cX, cY) {
        this.state.context.strokeStyle = this.props.brushColor;
        this.state.context.lineWidth = this.props.lineWidth;
        this.state.context.moveTo(lX, lY);
        this.state.context.lineTo(cX, cY);
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

DrawableCanvas.propTypes = {
    brushColor: PropTypes.string,
    lineWidth: PropTypes.number,
    canvasStyle: PropTypes.shape({
        backgroundColor: PropTypes.string,
        cursor: PropTypes.string
    }),
    clear: PropTypes.bool
};

DrawableCanvas.defaultProps = {
    brushColor: '#000000',
    lineWidth: 4,
    canvasStyle: {
        backgroundColor: '#FFFFFF',
        cursor: 'pointer'
    },
    clear: false

}
export default DrawableCanvas;