/**
 * Created by chzellot on 06.02.17.
 */
import { combineReducers } from 'redux'
import {replay} from './replay'
import {positions} from './positions'
import {canvas} from './canvas'
import {player} from './video'

const replayApp = combineReducers({
    replay,
    positions,
    player,
});

export default replayApp;
