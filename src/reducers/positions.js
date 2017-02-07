/**
 * Created by chzellot on 07.02.17.
 */
import {ACTION_POSITION, REPLAY, RECORDING} from "../constants";


export const DEFAULT_POSITION_STATE = {cursor: [], clicks: []};
export const positions = (state = DEFAULT_POSITION_STATE, action) => {
    switch (action.type) {
        case REPLAY.START:
            return Object.assign({}, DEFAULT_POSITION_STATE, {});
        case RECORDING.START:
            return Object.assign({}, DEFAULT_POSITION_STATE, {});
        case ACTION_POSITION.MOVE:
            return Object.assign({}, state, {cursor: [...state.cursor, action.data]});
        case ACTION_POSITION.CLICK:
            return Object.assign({}, state, {clicks: [...state.clicks, action.data]});
        default:
            return state;
    }
};