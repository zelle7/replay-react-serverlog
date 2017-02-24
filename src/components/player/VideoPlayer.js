/**
 * Created by chzellot on 24.02.17.
 */
import React, { Component, PropTypes } from 'react'
import YouTube from 'react-youtube'

class VideoPlayer extends Component {
    constructor(props, context){
        super(props, context);
        this.state = {
            player: null,
        };
        this.onReady = this.onReady.bind(this);
    }

    onReady(event) {
        console.log(`YouTube Player object for videoId: "${this.props.videoId}" has been saved to state.`); // eslint-disable-line
        this.setState({
            player: event.target,
        });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.playerProps.pause){
            this.state.player.pauseVideo();
        }
        if(nextProps.playerProps.play){
            this.state.player.playVideo();
        }
    }

    render() {
        const props = this.props;
        return (
            <div>
            <YouTube
                videoId={props.videoId}                  // defaults -> null
                id={props.id}                       // defaults -> null
                opts={
                    {playerVars: {
                        controls: 0,
                        disablekb: 1
                    }
                    }
                }
                className={props.className}                // defaults -> null
                onReady={this.onReady}                    // defaults -> noop
                //onPlay={props.onPlay}                     // defaults -> noop
                //onPause={props.onPause}                    // defaults -> noop
                onEnd={props.onEnd}                      // defaults -> noop
            />
                <div>
                    <button onClick={props.onPlay}>Play</button>
                    <button onClick={props.onPause}>Pause</button>
                </div>
            </div>

        )
    }
}
VideoPlayer.propTypes = {
    videoId: PropTypes.string.isRequired,
    id: PropTypes.string,
    className: PropTypes.string,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onEnd: PropTypes.func,
    playerProps: PropTypes.object
};

VideoPlayer.defaultProps = {
    onPlay: (e) => {console.log(e)},
    onPause: (e) => {console.log(e)},
    onEnd: (e) => {console.log(e)},
    playerProps: {play: false, pause: false}
};
export default VideoPlayer;