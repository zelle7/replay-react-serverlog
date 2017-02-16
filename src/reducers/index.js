/**
 * Created by chzellot on 06.02.17.
 */
import { combineReducers } from 'redux'
import {replay} from './replay'
import {positions} from './positions'
import {canvas} from './canvas'

const replayApp = combineReducers({
    replay,
    positions,
    canvas,
});

export default replayApp;
