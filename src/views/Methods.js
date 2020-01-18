import React, { useState, useEffect } from 'react';
import apiRequest from '../utils/apiRequest';
import { Grid, Card, CardContent, CardActions, Button, Container } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom';

const Methods = ({ currentUser }) => {

  const [methods, setMethods ] = useState(null);
  const history = useHistory();

  useEffect(() => {
    apiRequest(currentUser.token)
      .get(`/users/${currentUser.id}/methods`)
      .then(res => {
        setMethods(res.data)
      })
      .catch(() => {
        history.push('/login');
      });
  }, [setMethods, currentUser.token, currentUser.id, history]);

  const deleteHandler = methodId => {
    apiRequest(currentUser.token)
      .delete(`/users/${currentUser.id}/methods/${methodId}`)
      .then(() => {
        const updatedMethods = methods.filter(method => method.id !== methodId);
        setMethods(updatedMethods);
      })
      .catch(() => {
        history.push('/login');
      });
  };

  if (!methods) {
    return (
      <>
        <h2>...Loading Methods</h2>
      </>
    );
  }

  return (
    <>
      <Container maxWidth='lg'>
        <Grid container justify='flex-end' alignItems='center'>
          <Grid item xs={3}>
            <Link to='/methods/new'>
              <Button color='primary'>Add New Method</Button>
            </Link>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          {
            methods.length === 0 ?
            <h3>Add methods to get started.</h3>
            : methods.map(method => {
              return <Grid item xs={12} key={method.id}>
                      <Card>
                        <CardContent>
                          <p><strong>Name:</strong> {method.name}</p>
                        </CardContent>
                        <CardActions>
                          <Link to={`/methods/edit/${method.id}`}><Button>Edit</Button></Link>
                          <Button color="secondary" onClick={() => deleteHandler(method.id)}>Delete</Button>
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

export default Methods;
