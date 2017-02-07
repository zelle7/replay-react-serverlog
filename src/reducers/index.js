/**
 * Created by chzellot on 06.02.17.
 */
import { combineReducers } from 'redux'
import {replay} from './replay'
import {positions} from './positions'

const replayApp = combineReducers({
    replay,
    positions,
});

export default replayApp;
