//provider component
import React, { Component } from 'react';
import axios from 'axios';

const Context=React.createContext();
const reducer111=(state,actionTrack)=>{
    //evaluate the action type
    switch(actionTrack.type){
        case 'SEARCH':
            return{
                ...state,//spread operator to get whatever in state                
                track_list:actionTrack.payload,//response get back in search component AS payload
                heading:'Search Results'
            };
        default:
            return state;
    }
}

export class Provider extends Component {
    state={
        track_list:[],
        heading:'Top 10 US Music from MM Developer',
        //call dispatch from any comsumer component(search) to manipulate the state
        dispatch222:actionTrack=>this.setState(state=>reducer111(state,actionTrack))
    };

    //lifecycle method is available to any react component(class-based), it runs when component mounts 
    componentDidMount(){
        //back ticks here to use template string
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=5&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res=>
                {
                    //console.log(res.data);
                    this.setState({track_list:res.data.message.body.track_list});
                }
            )
            .catch(err=>console.log(err));
    }

    render() {
        //provider wrapped around every other components
        //in order to access whatever state I put in this provider
        return (
            //pass the whole state(whatever I want really)
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider> 
        )
    }
}

//Consumer is actually i import into my component, 
//then component to be able to access to the state from Context
//Then go to Tracks.js,bring in the global state
export const Consumer=Context.Consumer;
