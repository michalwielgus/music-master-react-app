import React, { Component } from 'react';

class Profile extends Component {
    render() {
        let artist = {name: '', followers: {total: ''}, images: [{url: ''}], genres: []};
            if(this.props.artist !== null) {
            artist = this.props.artist;
        }
        return (
            <div className="profile-content">
                <div className="profile-image"><img src={artist.images[0].url}/></div>
                <div className ="profile-description">
                <div className="artist-name">{artist.name}</div>
                <div><strong>Number of followers: </strong>{artist.followers.total}</div>
                <div><strong>Genres: </strong>{
                    artist.genres.map((genre, key) => {
                        if(artist.genres.length > 1) {
                            genre = genre != artist.genres[artist.genres.length - 1] ? ` ${genre}, ` : ` & ${genre}`
                        }

                        return (
                            <span key={key}>{genre}</span>
                        )
                    })
                }</div>
                </div>
            </div>
        )
    }
}

export default Profile;
