/**
 * Created by chzellot on 07.02.17.
 */
import {REPLAY, RECORDING, ACTION_POSITION} from "../constants";


/**
 * fetches the logs from the server and starts the autoplay of the states
 * @param store
 * @param logListUrl
 * @param fetchConfig
 * @returns {function()}
 */
export function restoreHistory(store, logListUrl, fetchConfig) {
    if(fetchConfig == null){
        fetchConfig = {method: 'get', credentials: 'include'}
    }
    return () => {
        fetch(logListUrl, fetchConfig)
            .then(function(resp) {
                return resp.json();
            })
            .then((logs) => autoPlayStates(store, logs));
    }
}

export function autoPlayStates(store, logs) {
    console.log(logs);
    store.dispatch({type: REPLAY.START, data: null});
    if (logs.length === 0) {
        deactivateAutoplay();
        return;
    }
    let index = 0;
    let nextActionTime = 200;
    playIndex(index);

    function playIndex(index) {
        if(logs.length > index) {
            setTimeout(function() {
                let parsedState = JSON.parse(logs[index].log);
                if(parsedState.type !== RECORDING.START) { //TODO make list instead of one and check if is in array
                    store.dispatch(parsedState);
                }
                if((index+1) < logs.length){
                    nextActionTime = logs[index+1].timestamp - logs[index].timestamp;
                    console.log(nextActionTime);
                }
                playIndex(++index);
            }, nextActionTime);
        } else {
            deactivateAutoplay(store);
        }
    }


}

export function deactivateAutoplay(store){
    store.dispatch({type: REPLAY.STOP, data: null});
}

let lastPosTimer = 0;
export function trackCursorPosition(store, timeBetweenClicks){
    return (cursorPosition) => {
        let currentTime = new Date().getTime();
        if(lastPosTimer < currentTime && !store.getState().replay.active ) {
            store.dispatch({type: ACTION_POSITION.MOVE, data: {x: cursorPosition.x, y: cursorPosition.y}});
            lastPosTimer = currentTime + timeBetweenClicks;
        }
    }
}