/**
 * Created by chzellot on 07.02.17.
 */
import {VIDEO_PLAYER} from "../constants";


export const DEFAULT_PLAYER_STATE = {play: false, pause: false};
export const player = (state = DEFAULT_PLAYER_STATE, action) => {
    switch (action.type) {
        case VIDEO_PLAYER.PLAY:
            return Object.assign({}, state, {play: true, pause: false});
        case VIDEO_PLAYER.PAUSE:
            return Object.assign({}, state, {play: false, pause: true});
        default:
            return state;
    }
};