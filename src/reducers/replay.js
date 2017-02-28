/**
 * Created by chzellot on 06.02.17.
 */
import {REPLAY, RECORDING, SESSIONLIST} from "../constants";


export const DEFAULT_REPLAY_STATE = {
    replay: false,
    recording: false,
    sessionsFetching: false,
    sessions: [],
    activeSession: _generateUUID()
};
export const replay = (state = DEFAULT_REPLAY_STATE, action) => {
    switch (action.type) {
        case REPLAY.START:
            return Object.assign({}, state, {replay: true, recording: false}); //cannot record and replay at once
        case REPLAY.STOP:
            return Object.assign({}, state, {replay: false});
        case RECORDING.START:
            return Object.assign({}, state, {replay: false, recording: true}); //cannot record and replay at once
        case RECORDING.STOP:
            return Object.assign({}, state, {recording: false});
        case SESSIONLIST.FETCHING:
            return Object.assign({}, state, {sessionsFetching: true});
        case SESSIONLIST.FETCHED:
            return Object.assign({}, state, {sessionFetching: false, sessions: action.data});
        case SESSIONLIST.CHANGE_ACTIVE:
            return Object.assign({}, state, {activeSession: action.session});
        default:
            return state;
    }
};

function _generateUUID() {
    let d = new Date().getTime();
    return 'xxxxxxxx-xxxx-yxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        //eslint-disable-next-line
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}