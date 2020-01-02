import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import MainPage from './components/Layout/MainPage';
import Home from './components/Layout/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PrivateRoute from './components/Auth/PrivateRoute';

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
          <PrivateRoute path='/home' component={Home} />
          <Route path='/'>
            <MainPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
