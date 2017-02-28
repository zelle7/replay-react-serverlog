/**
 * Created by chzellot on 07.02.17.
 */
import {REPLAY, RECORDING, ACTION_POSITION, SESSIONLIST} from "../constants";


/**
 * fetches the logs from the server and starts the autoplay of the states
 * @param store
 * @param logListUrl
 * @param fetchConfig
 * @returns {function()}
 */
export function restoreHistory(store, logListUrl, fetchConfig) {
    if (fetchConfig == null) {
        fetchConfig = {method: 'get', credentials: 'include'}
    }
    return () => {
        let url = logListUrl + '?token=' + store.getState().replay.activeSession;
        fetch(url, fetchConfig)
            .then(function (resp) {
                return resp.json();
            })
            .then((logs) => autoPlayStates(store, logs))
            .catch(function (err) {
                console.error("error on fetching session", err);
            });
    }
}


/**
 * function which does the actual autoplay, it takes a log array (probably fetched from a server) and do the replay
 * each log entry should be an existing redux compatible action with the payload
 * @param store
 * @param logs
 */
export function autoPlayStates(store, logs) {
    store.dispatch({type: REPLAY.START, data: null});
    if (logs.length === 0) {
        console.error("no log data given will be autoplay will be stopped now")
        deactivateAutoplay(store);
        return;
    }
    let index = 0;
    let nextActionTime = 200;
    let parsedNextState = null;
    playIndex(index);

    function playIndex(index) {
        if (logs.length > index) {
            setTimeout(function () {
                let parsedState = parsedNextState != null ? parsedNextState : JSON.parse(logs[index].log);
                if (parsedState.type !== RECORDING.START) { //TODO make list instead of one and check if is in array
                    store.dispatch(parsedState);
                }
                let bodyEl = window.document.body.style;
                if ((index + 1) < logs.length) {
                    parsedNextState = JSON.parse(logs[index+1].log);
                    let actionTimeAct = new Date(parsedState.statData.actionTime).getTime();
                    let actionTimeNext = new Date(parsedNextState.statData.actionTime).getTime();
                    nextActionTime =  actionTimeNext -actionTimeAct;
                    bodyEl.height = parsedState.statData.bodyHeight + 'px';
                    bodyEl.width = parsedState.statData.bodyWidth + 'px';
                } else {
                    parsedNextState = null;
                }
                if (store.getState().replay.replay) {
                    playIndex(++index);
                }
            }, nextActionTime);
        } else {
            deactivateAutoplay(store);
        }
    }


}

/**
 * sends the stop command to the redux reducer
 * @param store
 */
export function deactivateAutoplay(store) {
    store.dispatch({type: REPLAY.STOP, data: null});
    window.document.body.style.height = null;
    window.document.body.style.width = null;
    //reset height and width 
}

let lastPosTimer = 0;
/**
 * function to track the cursor movement, after each timeout a redux event will be send. The functions returns a
 * functions so that it can be used as click handler on elements
 * @param store - redux store
 * @param timeBetweenClicks - timeout between two click events sended to the redux store
 * @returns {function(*)} - which does the actual tracking
 */
export function trackCursorPosition(store, timeBetweenClicks) {
    return (cursorPosition) => {
        let currentTime = new Date().getTime();
        if (lastPosTimer < currentTime && !store.getState().replay.active) {
            store.dispatch({type: ACTION_POSITION.MOVE, data: {x: cursorPosition.x, y: cursorPosition.y}});
            lastPosTimer = currentTime + timeBetweenClicks;
        }
    }
}
/**
 * simple click handler which tracks the click position and sends an action to the redux store
 * @param dispatch - dispatch function of the redux store
 * @returns {function(*)}
 */
export function trackClickPosition(dispatch) {
    return (e) => {
        dispatch({type: ACTION_POSITION.CLICK, data: {x: e.screenX, y: e.screenY}})
    }
}

/**
 * prepares the loading method for the recording session list
 * @param sessionListUrl - url where the app should look for sessions
 * @param fetchConfig - configuration object of the fetch method (default will be get and credentials true)
 * @param dispatch - dispatch method of the Redux store
 * @returns {function()}
 */
export function fetchSessions(sessionListUrl, fetchConfig, dispatch) {
    dispatch({type: SESSIONLIST.FETCHING});
    if (fetchConfig == null) {
        fetchConfig = {method: 'get', credentials: 'true', cors: 'true'}
    }
    return () => {
        fetch(sessionListUrl, fetchConfig)
            .then(function (resp) {
                return resp.json()
            })
            .then((sessions) => {
                dispatch({type: SESSIONLIST.FETCHED, data: sessions});
            });
    }
}