import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import MainPage from './components/MainPage';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

function App() {

  return (
    <Router>
      <div>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/home'>
            <Home />
          </Route>
          <Route path='/'>
            <MainPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
