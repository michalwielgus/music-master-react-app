import React, { Component } from 'react';
import '../style/style.css';

class Gallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nowPlayingUrl: '',
            isPlaying: false,
            track: null
        }
    }

    playTrack(previewUrl) {
        const track = new Audio(previewUrl);

        if(!this.state.isPlaying) {
            track.play();

            this.setState({
                nowPlayingUrl: previewUrl,
                isPlaying: true,
                track
            });
        } else {
            if(previewUrl === this.state.nowPlayingUrl) {
                this.state.track.pause();
                this.setState({
                    nowPlayingUrl: '',
                    isPlaying: false,
                });
            } else {
                this.state.track.pause();
                track.play()
                this.setState({
                    nowPlayingUrl: previewUrl,
                    isPlaying: true,
                    track
                });
            }
        }
    }

    render() {
        const tracks = this.props.tracks;
        return(
            <div className="gallery">
               {
                   tracks.map((track, key) => {
                       const trackTitle = track.name;
                       const trackImage = track.album.images[0].url;

                       return (
                            <div key={key} className="track" onClick={() => this.playTrack(track.preview_url)}>
                                <img src={trackImage} alt="trackTitle" className="track-image"></img>
                                <p className="track-title">{trackTitle}</p>
                                <div className="track-play">
                                    <div className="track-play-inner">
                                        { this.state.nowPlayingUrl === track.preview_url ?
                                            <span>| |</span>
                                            :
                                            <span>&#9654;</span>
                                        }
                                    </div>
                                </div>
                            </div>
                       )
                   })
               }
            </div>
        )
    }
}

export default Gallery;
