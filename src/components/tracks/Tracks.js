import React, { Component } from 'react';

import {Consumer} from '../../context';

import Spinner from '../layout/Spinner'
import Track from '../tracks/Track'

//rcc+tab

class Tracks extends Component {
    render() {
        return (
            //value is related  <Context.Provider value={this.state}> in context.js
            //https://developer.musixmatch.com/documentation/api-reference/track-chart-get
            <Consumer>
                {value=>{ 
                    //console.log(value);
                    //use destructuring instead of value.track_list, put tl and h out of value 
                    const {track_list,heading}=value;
                    if(track_list===undefined || track_list.length===0){
                        return <Spinner/>
                    }else{
                        //return sth to interface
                        return(
                            <div className="container text-muted">
                                <h3 className="text-center mb-4 text-warning">{heading}</h3>
                                <div className="row">
                                    {track_list.map(item=>(
                                        //track in here is prop
                                       <Track key={item.track.track_id} track={item.track}/>
                                    ))}
                                </div>            
                            </div>
                        );
                    }
                }}
            </Consumer>
        )
    }
}

export default Tracks;
