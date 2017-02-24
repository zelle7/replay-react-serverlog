/**
 * Created by chzellot on 24.02.17.
 */

import React, { Component } from 'react'
import { Media, Player, controls, utils, withMediaProps } from 'react-media-player'
const { PlayPause, CurrentTime, Progress, SeekBar, Duration, MuteUnmute, Volume, Fullscreen } = controls;
const { keyboardControls } = utils;

class VideoPlayer extends Component {
    render() {
        const { Player, keyboardControls } = this.props;
        return (
            <Media>

                    <div className="media">
                        <Player
                            src="https://www.youtube.com/watch?v=GPria4lrLRc"
                            className="media-player"
                        />
                        <div className="media-controls">
                            <PlayPause/>
                            <CurrentTime/>
                            <Progress/>
                            <SeekBar/>
                            <Duration/>
                            <MuteUnmute/>
                            <Volume/>
                            <Fullscreen/>
                        </div>
                    </div>

            </Media>
        )
    }
}
// export default withMediaProps(VideoPlayer);

export default VideoPlayer;