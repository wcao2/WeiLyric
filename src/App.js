import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
//imp + tab
import Navbar from './components/layout/Navbar';
import Index from './components/layout/Index';
import Lyrics from './components/tracks/Lyrics';

//Provider needs curly braces cos it is not a default export  
import {Provider} from './context';

import './App.css';

function App() {
  return (
    //wrap everyting here in the provider 
    <Provider>
      <Router>
        <React.Fragment>
          <Navbar/>
          <div className="container">
            <Switch>
                <Route exact path="/" component={Index}/>
                <Route exact path="/lyrics/track/:id" component={Lyrics}/>
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
