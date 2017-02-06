/**
 * Created by chzellot on 06.02.17.
 */
import React, { PropTypes } from 'react'

const Controls = ({ recording, onRecordingClick, replay, onReplayClick }) => (
    <div className="replay-controls">
        <div>
            <button className={'btn ' + (replay ? 'btn-primary' : 'btn-default')} onClick={onReplayClick}>Replay</button>
            <button className={'btn ' + (recording ? 'btn-primary' : 'btn-default')} onClick={onRecordingClick}>Recording</button>
        </div>
    </div>
);

Controls.propTypes = {
    onReplayClick: PropTypes.func.isRequired,
    onRecordingClick: PropTypes.func.isRequired,
    recording: PropTypes.bool.isRequired,
    replay: PropTypes.bool.isRequired,
};

export default Controls;