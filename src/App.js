import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, CssBaseline } from '@material-ui/core';

import MainPage from './components/Layout/MainPage';
import Home from './components/Layout/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PrivateRoute from './components/Auth/PrivateRoute';
import Coffees from './components/Coffees/Coffees';
import Methods from './components/Methods/Methods';
import Recipes from './components/Recipes/Recipes';

function App() {

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Router>
            <Switch>
              <Route exact path='/' component={MainPage} />
              <Route path='/login' component ={Login} />
              <Route path='/register' component={Register} />
              <PrivateRoute path='/home' component={Home} />
              <PrivateRoute path='/coffees' component={Coffees} />
              <PrivateRoute path='/methods' component={Methods} />
              <PrivateRoute path='/recipes' component={Recipes} />
            </Switch>
        </Router>
      </Container>
    </>
  );
}

export default App;
