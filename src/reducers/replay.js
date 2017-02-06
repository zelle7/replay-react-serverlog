/**
 * Created by chzellot on 06.02.17.
 */
import {REPLAY, RECORDING} from "../constants";


export const DEFAULT_REPLAY_STATE = {replay: false, recording: false};
export const replay = (state = DEFAULT_REPLAY_STATE, action) => {
    switch (action.type){
        case REPLAY.START:
            return Object.assign({}, state, {replay: true, recording: false}); //cannot record and replay at once
        case REPLAY.STOP:
            return Object.assign({}, state, {replay: false});
        case RECORDING.START:
            return Object.assign({}, state, {replay: false, recording: true}); //cannot record and replay at once
        case RECORDING.STOP:
            return Object.assign({}, state, {recording: false});
        default:
            return state;
    }
};