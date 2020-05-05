import React from 'react';
import Tracks from '../tracks/Tracks';
import Search from '../tracks/Search';

//functional component rfc+tab

const Index = () => {
    return (
        <React.Fragment>
            <Search/>
            <Tracks/>
        </React.Fragment>
    )
}

export default Index;
