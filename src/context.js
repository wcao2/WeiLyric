//provider component

import React, { Component } from 'react';

import axios from 'axios';

const Context=React.createContext();

const reducer=(state,action)=>{
    switch(action.type){
        case 'SEARCH':
            return{
                ...state,
                track_list:action.payload,
                heading:'Search Results'
            };
            default:
                return state;
    }
}

export class Provider extends Component {
    state={
        track_list:[],
        heading:'Top 10 US music from MM Developer',
        //call dispatch from any comsumer component(search) to manipulate the state
        dispatch:action=>this.setState(state=>reducer(state,action))
    };

    componentDidMount(){
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`)
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
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider> 
        )
    }
}

//Import to my component to be access to the state from Context
export const Consumer=Context.Consumer;
