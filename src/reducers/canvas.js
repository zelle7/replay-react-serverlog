/**
 * Created by chzellot on 07.02.17.
 */
import {ACTION_POSITION, REPLAY, RECORDING, CANVAS} from "../constants";


export const DEFAULT_CANVAS_STATE = {
    drawing: false,
    lastX: null,
    lastY: null,
    currentX: null,
    currentY: null,
    reset: false,
    drawn: true,
    brushColor: 'rgba(0,0,0,1)',
    brushSize: 4,
};
export const canvas = (state = DEFAULT_CANVAS_STATE, action) => {
    switch (action.type) {
        case CANVAS.MOUSE_UP:
        case CANVAS.MOUSE_DOWN:
        case CANVAS.MOUSE_MOVE:
            return Object.assign({}, state, action.data);
        case CANVAS.RESET:
            return Object.assign({}, state, {reset: true});
        case REPLAY.START:
            return Object.assign({}, DEFAULT_CANVAS_STATE, {reset: true});
        case CANVAS.RESET_DONE:
            return Object.assign({}, state, {reset: false});
        case CANVAS.CHANGE_COLOR:
            return Object.assign({}, state, {brushColor: action.color});
        case CANVAS.DRAWN:
            return Object.assign({}, state, {
                lastX: state.currentX,
                lastY: state.currentY,
                currentX: null,
                currentY: null,
                drawn: true
            });
        default:
            return state;
    }
};