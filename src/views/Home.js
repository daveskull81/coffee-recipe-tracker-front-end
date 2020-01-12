import React from 'react';
import { Grid, Paper, Card, CardContent } from '@material-ui/core';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Link to='/coffees'>
            <Card>
              <CardContent>
                <h2>Coffees</h2>
                <p>All of your saved coffees to be used in your brewing recipes.</p>
              </CardContent>            
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Link to='/methods'>
            <Card>
              <CardContent>
                <h2>Methods</h2>
                <p>All of your saved brewing methods</p>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Link to='/recipes'>
            <Card>
              <CardContent>
                <h2>Recipes</h2>
                <p>All of your saved brewing recipes</p>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
