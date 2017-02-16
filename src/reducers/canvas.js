/**
 * Created by chzellot on 07.02.17.
 */
import {ACTION_POSITION, REPLAY, RECORDING, CANVAS} from "../constants";


export const DEFAULT_CANVAS_STATE = {drawing: false, lastX: null, lastY: null, nextX: null, nextY: null};
export const canvas = (state = DEFAULT_CANVAS_STATE, action) => {
    switch (action.type) {
        case CANVAS.MOUSE_UP:
        case CANVAS.MOUSE_DOWN:
        case CANVAS.MOUSE_MOVE:
            return Object.assign({}, state, action.data);
        default:
        return state;
    }
};