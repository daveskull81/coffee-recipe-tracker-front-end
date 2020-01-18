import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import MainPage from './views/MainPage';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import PrivateRoute from './components/Auth/PrivateRoute';
import AllCoffees from './views/AllCoffees';
import AllMethods from './views/AllMethods';
import AllRecipes from './views/AllRecipes';
import AddCoffee from './forms/AddCoffee';
import EditCoffee from './forms/EditCoffee';
import AddMethod from './forms/AddMethod';
import EditMethod from './forms/EditMethod';
import AppMenuBar from './components/Layout/AppMenuBar';

function App() {

  return (
    <>
      <CssBaseline />
        <Router>
            <AppMenuBar />
            <Switch>
              <Route exact path='/' component={MainPage} />
              <Route path='/login' component ={Login} />
              <Route path='/register' component={Register} />
              <PrivateRoute path='/home' component={Home} />
              <PrivateRoute exact path='/coffees' component={AllCoffees} />
              <PrivateRoute exact path='/methods' component={AllMethods} />
              <PrivateRoute exact path='/recipes' component={AllRecipes} />
              <PrivateRoute path='/coffees/new' component={AddCoffee} />
              <PrivateRoute path='/coffees/edit/:coffeeId' component={EditCoffee} />
              <PrivateRoute path='/methods/new' component={AddMethod} />
              <PrivateRoute path='/methods/edit/:methodId' component={EditMethod} />
            </Switch>
        </Router>
    </>
  );
}

export default App;
