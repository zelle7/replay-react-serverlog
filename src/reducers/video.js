/**
 * Created by chzellot on 07.02.17.
 */
import {VIDEO_PLAYER, RECORDING, REPLAY} from "../constants";


export const DEFAULT_PLAYER_STATE = {play: false, pause: false, reset: false};
export const player = (state = DEFAULT_PLAYER_STATE, action) => {
    switch (action.type) {
        case VIDEO_PLAYER.PLAY:
            return Object.assign({}, state, {play: true, pause: false, reset: false});
        case VIDEO_PLAYER.PAUSE:
            return Object.assign({}, state, {play: false, pause: true, reset: false});
        case VIDEO_PLAYER.RESET:
        case RECORDING.START:
        case REPLAY.START:
            return Object.assign({}, DEFAULT_PLAYER_STATE, {reset: true});
        case VIDEO_PLAYER.RESET_DONE:
            return Object.assign({}, DEFAULT_PLAYER_STATE, {reset: false});
        default:
            return state;
    }
};