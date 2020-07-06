import React, { Component } from 'react'
import axios from 'axios';
import {Consumer} from '../../context'

//rcc+tab
class Search extends Component {
    state={
        //input property name's value should be same in here
        trackTitle:''
    }
    onChange = e =>{
        this.setState({[e.target.name]:e.target.value});
    }

    findTrack =(dispatch222,e)=>{
        e.preventDefault();       
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res=>
                    {
                        //I need to manipulate the global state,dispatch an action to context
                        //console.log(res.data);
                        dispatch222({
                            type:'SEARCH',
                            //this is a payload I send to the reducer in context
                            payload:res.data.message.body.track_list
                        });
                        this.setState({trackTitle:''})
                    }
            )
            .catch(err=>console.log(err));
        
    }

    render() {
        return (
            //value includes the entire state,comes from global state(Context.js)
            //value is related  <Context.Provider value={this.state}> in context.js
            // have an event listener for change event and setState to whatever type in here
            //In input value={this.state.trackTitle} can omit
            <Consumer>
                {value=>{
                    console.log(value);//entire state
                    const {dispatch222}=value;//cos Consumer, My value involves dispatch222,pull out this from value
                    return (
                        <div className="card card-body mb-4 p-4">
                            <h1 className="display-4 text-center">
                                <i className="fas fa-music"></i> Search For A Song
                            </h1>
                            <p className="lead text-center">Get the lyrics for song</p>
                            <form onSubmit={this.findTrack.bind(this,dispatch222)}>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg" placeholder="Song title..." 
                                        name="trackTitle"                                                                       
                                        onChange={this.onChange}/> 
                                </div>
                                <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">
                                    Start Getting Lyrics
                                </button>
                            </form>
                        </div>
                    );
                }}
            </Consumer>
        )
    }
}

export default Search;
