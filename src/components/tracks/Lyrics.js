import React, { Component } from 'react'

import axios from 'axios';
import {Link} from 'react-router-dom'
import Moment from 'react-moment'

import Spinner from '../layout/Spinner';

class Lyrics extends Component {
    state={
        track:{},
        lyrics:{}
    }   

    //when this component loads, I want to use Axios
    componentDidMount(){
        //get id parameter from url
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
        )
        .then(res=>{
            console.log(res.data);
            this.setState({lyrics:res.data.message.body.lyrics});
            return axios.get(
                `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
            )
        })
        .then(res=>{
            console.log(res.data);
            this.setState({track:res.data.message.body.track});       
        })
        .catch(err=>console.log(err));
    }

    render() {
        const {track,lyrics}=this.state;
        console.log(track)
        if(track===undefined||lyrics===undefined||Object.keys(track).length===0||Object.keys(lyrics).length===0){
            return <Spinner/>
        }else{
            return (
                <div className="container">
                    <div className="card">
                        <h5 className="card-header">
                            {track.track_name} by <span className="text-secondary">{track.artist_name}</span>
                        </h5>
                        <div className="card-body">
                            <p className="card-text">{lyrics.lyrics_body}</p>
                        </div>
                    </div>
                    <Link to="/" className="btn btn-success btn-sm mb-4">Go Back</Link>

                    <ul className="list-group mt-3">
                        <li className="list-group-item">
                            <strong>AlbumID</strong>:{track.album_id}
                        </li>
                        <li className="list-group-item">
                            <strong>Song Style</strong>:{track.primary_genres.music_genre_list.length !== 0? track.primary_genres.music_genre_list[0].music_genre.music_genre_name: 'NOT SURE'}
                        </li>
                        <li className="list-group-item">
                            <strong>Release Date</strong>: {' '}
                                    <Moment format="MM/DD/YYYY">{track.first_release_date}</Moment>
                        </li>
                    </ul>
                </div>

               
            )
        }        
    }
}


export default Lyrics;