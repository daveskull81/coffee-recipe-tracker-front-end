import React, { useState, useEffect } from 'react';
import apiRequest from '../utils/apiRequest';
import { Grid, Card, CardContent, CardActions, Button, Container } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom';

const Coffees = ({ currentUser }) => {

  const [coffees, setCoffees ] = useState(null);
  const history = useHistory();

  useEffect(() => {
    apiRequest(currentUser.token)
      .get(`/users/${currentUser.id}/coffees`)
      .then(res => {
        setCoffees(res.data)
      })
      .catch(() => {
        history.push('/login');
      });
  }, [setCoffees, currentUser.token, currentUser.id, history]);

  const deleteHandler = coffeeId => {
    apiRequest(currentUser.token)
      .delete(`/users/${currentUser.id}/coffees/${coffeeId}`)
      .then(() => {
        const updatedCoffees = coffees.filter(coffee => coffee.id !== coffeeId);
        setCoffees(updatedCoffees);
      })
      .catch(() => {
        history.push('/login');
      });
  };

  if (!coffees) {
    return (
      <>
        <h2>...Loading Coffees</h2>
      </>
    );
  }

  return (
    <>
      <Container maxWidth='lg'>
        <Grid container justify='flex-end' alignItems='center'>
          <Grid item xs={3}>
            <Link to='/coffees/new'>
              <Button color='primary'>Add New Coffee</Button>
            </Link>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          {
            coffees.length === 0 ?
            <h3>Add coffees to get started.</h3>
            : coffees.map(coffee => {
              return <Grid item xs={12} key={coffee.id}>
                      <Card>
                        <CardContent>
                          <p><strong>Name:</strong> {coffee.name}</p>
                          <p><strong>Roaster:</strong> {coffee.roaster}</p>
                          <p><strong>Origin:</strong> {coffee.country_of_origin}</p>
                          <p><strong>Region:</strong> {coffee.region}</p>
                          <p><strong>Processing:</strong> {coffee.processing_method}</p>
                          <p><strong>Roast Level:</strong> {coffee.roast_level}</p>
                        </CardContent>
                        <CardActions>
                          <Link to={`/coffees/edit/${coffee.id}`}><Button>Edit</Button></Link>
                          <Button color="secondary" onClick={() => deleteHandler(coffee.id)}>Delete</Button>
                        </CardActions>
                      </Card>
                    </Grid>
            })
          }
        </Grid>
      </Container>
    </>
  );
}

export default Coffees;
