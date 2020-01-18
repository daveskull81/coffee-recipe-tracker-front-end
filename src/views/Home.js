import React from 'react';
import { Grid, Card, CardContent, CardActionArea, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AppMenuBar from '../components/Layout/AppMenuBar';

const Home = () => {
  return (
    <>
      <AppMenuBar headingText='Home' />
      <Container maxWidth='lg'>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardActionArea component={Link} to='/coffees'>
                <CardContent>
                  <h2>Coffees</h2>
                  <p>All of your saved coffees to be used in your brewing recipes.</p>
                </CardContent>
              </CardActionArea>          
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardActionArea component={Link} to='/methods'>
                <CardContent>
                  <h2>Methods</h2>
                  <p>All of your saved brewing methods</p>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardActionArea component={Link} to='/recipes'>
                <CardContent>
                  <h2>Recipes</h2>
                  <p>All of your saved brewing recipes</p>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Home;
