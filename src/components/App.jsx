import React, { Component } from 'react';
import '../style/style.css';
import { FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import Profile from './Profile.jsx';
import Gallery from './Gallery.jsx'


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            artist: null,
            accessToken: '',
            tracks: []
        }
    }

    componentWillMount() {
        const DATA = {
            grant_type: 'refresh_token',
            refresh_token: 'AQADe1KYOun6xYmxEFVF1710YNYDYoA5bLlH1pyxidlHnM2CdpSx7mj1mHtLTDSr8k2JFoqoyvM5W2Lzum1UkYG0U0OjargaNOAdd3g6krSTRxSAnRFARY-QKNwfZmyvqPk',
        }

        const headers = new Headers({
            'Access-Control-Allow-Origin':'*',
            'Authorization': 'Basic ZWY3NmQ3MDY0Yjc2NGVkNjk1Y2VkZWNiZTVmZDhiN2U6MTk4YzE5YTRjNWI5NDYyZjg4ZTZlYTkxNDhkNmZkY2Q=',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        });
        fetch('https://webwarriors.pl/michalwielgus/react/music-master-react-app/get_token.php', {
            method: 'GET',
            headers: headers,
            mode: 'cors'
        })
        .then(response => response.json())
        .then(response => {
            this.setState({accessToken: response.access_token})
        });
    }
    search() {
        if(this.state.query !== '') {
            const BASE_URL_ARTIST = 'https://api.spotify.com/v1/search';
            const BASE_URL_TRACKS = 'https://api.spotify.com/v1/artists'
            let fetch_url = `${BASE_URL_ARTIST}?q=${this.state.query}&type=artist&limit=1&access_token=${this.state.accessToken}`;
            fetch(fetch_url, {
                method: 'GET',
            })
            .then(response => response.json())
            .then(json => {
                const artist = json.artists.items[0];
                this.setState({artist});
                fetch_url = `${BASE_URL_TRACKS}/${artist.id}/top-tracks?country=PL&access_token=${this.state.accessToken}`;
                fetch(fetch_url, {
                    method: 'GET'
                })
                .then(response => response.json())
                .then(json => {
                    const { tracks } = json;
                    this.setState({tracks});
                });

            });
        }
    }

    render() {
        return (
            <div className="app">
                <h1 class-name="app-title">Music Master - React App</h1>
                <FormGroup className="search-form">
                   <InputGroup>
                    <FormControl
                        type ="text"
                        placeholder="Search an Artist"
                        onChange={event => this.setState({query: event.target.value})}
                        onKeyPress={event => {
                               if(event.key === 'Enter') {
                                   this.search();
                               }
                           }}
                        />
                    <InputGroup.Addon onClick={() => this.search()}>
                     <Glyphicon glyph="search"></Glyphicon>
                    </InputGroup.Addon>
                   </InputGroup>
                </FormGroup>
                { this.state.artist !== null ?
                    <div className="profile-details">
                        <Profile className="profile" artist={this.state.artist}>
                        </Profile>
                        <Gallery tracks={this.state.tracks}>
                        </Gallery>
                    </div>

                    :

                    <div></div>
                }
            </div>
        )
    }
}

export default App;
