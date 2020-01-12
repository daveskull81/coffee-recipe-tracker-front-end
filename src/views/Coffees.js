import React, { useState, useEffect } from 'react';
import apiRequest from '../utils/apiRequest';
import { Grid, Card, CardContent, CardActions, Button } from '@material-ui/core'

const Coffees = ({ currentUser }) => {

  const [coffees, setCoffees ] = useState(null);

  useEffect(() => {
    apiRequest(currentUser.token)
      .get(`/users/${currentUser.id}/coffees`)
      .then(res => {
        setCoffees(res.data)
      })
      .catch(err => {
        console.log(err);
      });
  }, [setCoffees, currentUser.token, currentUser.id]);

  if (!coffees) {
    return (
      <>
        <h1>All Coffees</h1>
        <h2>...Loading</h2>
      </>
    );
  }

  return (
    <>
      <Grid container justify='space-between' alignItems='center'>
        <Grid item xs={4}>
        <h2>All Coffees</h2>
        </Grid>
        <Grid item xs={3}>
          <Button color='primary'>Add New Coffee</Button>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {
          coffees.length === 0 ?
          <h3>Add coffees to get started.</h3>
          : coffees.map(coffee => {
            return <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <p><strong>Name:</strong> {coffee.name}</p>
                        <p><strong>Roaster:</strong> {coffee.roaster}</p>
                        <p><strong>Origin:</strong> {coffee.country_of_origin}</p>
                        <p><strong>Region:</strong> {coffee.region}</p>
                        <p><strong>Processing:</strong> {coffee.processing}</p>
                        <p><strong>Roast Level:</strong> {coffee.roast_level}</p>
                      </CardContent>
                      <CardActions>
                        <Button>Edit</Button>
                        <Button color="secondary">Delete</Button>
                      </CardActions>
                    </Card>
                   </Grid>
          })
        }
      </Grid>
    </>
  );
}

export default Coffees;
