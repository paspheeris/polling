import React, { Component } from 'react';
// import logo from './ballotBox.svg';
import './App.css';

import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Import Components
import LandingPage from './components/LandingPage';
import NavBar from './components/NavBar';
import Polls from './components/Polls';
import PollVoteView from './components/PollVoteView';
import PollCreateEdit from './components/PollCreateEdit';
import Profile from './components/Profile';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <NavBar />
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route path="/polls" component={Polls} />
              <Route path="/poll/vote/:uuid" component={PollVoteView} />
              <Route path="/poll/:mode/:uuid" component={PollCreateEdit} />
              <Route path="/profile" component={Profile} />
            </Switch>
          </div>
        </BrowserRouter>        
      </Provider>
    );
  }
}

export default App;
