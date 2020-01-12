import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, CssBaseline } from '@material-ui/core';

import MainPage from './views/MainPage';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import PrivateRoute from './components/Auth/PrivateRoute';
import Coffees from './views/Coffees';
import Methods from './views/Methods';
import Recipes from './views/Recipes';

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
