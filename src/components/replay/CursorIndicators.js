/**
 * Created by chzellot on 04.02.17.
 */
import React, {PropTypes} from "react";


class CursorIndicators extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderPositions = this.renderPositions.bind(this);
    }

    renderPositions(positions, color, opacity, zIndex, size, keyPrefix) {
        let i = 0;
        return positions.map((pos) => <div key={keyPrefix + i++} style={{
            position: 'absolute',
            left: pos.x-size/2,
            top: pos.y-size/2,
            backgroundColor: color,
            borderRadius: size/2,
            height: size+'px',
            width: size+'px',
            opacity: opacity,
            zIndex: zIndex
        }}>&nbsp;</div>);
    }

    render() {
        const {cursorPositions, clickPositions, colorMovement, colorPositions, opacity, zIndex, sizeMove, sizeClick} = this.props;
        return <div>
            {this.renderPositions(cursorPositions, colorMovement, opacity, zIndex, sizeMove, 'cursor-')}
            {this.renderPositions(clickPositions, colorPositions, opacity, zIndex, sizeClick, 'click-')}
        </div>;
    }
}
CursorIndicators.propTypes = {
    colorMovement: PropTypes.string,
    colorPositions: PropTypes.string,
    opacity: PropTypes.number,
    sizeMove: PropTypes.number,
    sizeClick: PropTypes.number,
    zIndex: PropTypes.number,
    cursorPositions: PropTypes.array,
    clickPositions: PropTypes.array,
};

export default CursorIndicators;