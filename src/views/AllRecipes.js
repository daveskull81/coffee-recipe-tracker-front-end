import React, { useState, useEffect } from 'react';
import apiRequest from '../utils/apiRequest';
import { Grid, Card, CardContent, CardActionArea, Button, Container } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom';

const AllRecipes = ({ currentUser }) => {
  
  const [recipes, setRecipes ] = useState(null);
  const history = useHistory();

  useEffect(() => {
    apiRequest(currentUser.token)
      .get(`/users/${currentUser.id}/recipes`)
      .then(res => {
        setRecipes(res.data)
      })
      .catch(() => {
        history.push('/login');
      });
  }, [setRecipes, currentUser.token, currentUser.id, history]);

  if (!recipes) {
    return (
      <>
        <h2>...Loading Recipes</h2>
      </>
    );
  }

  return (
    <>
      <Container maxWidth='lg'>
        <Grid container justify='flex-end' alignItems='center'>
          <Grid item xs={3}>
            <Link to='/recipes/new'>
              <Button color='primary'>Add New Recipe</Button>
            </Link>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          {
            recipes.length === 0 ?
            <h3>Add recipes to get started.</h3>
            : recipes.map(recipe => {
              return <Grid item xs={12} key={recipe.id}>
                      <Card>
                        <CardActionArea component={Link} to={`/recipes/${recipe.id}`}>
                          <CardContent>
                            <p><strong>Name:</strong> {recipe.name}</p>
                            <p><strong>Rating:</strong> {recipe.rating}</p>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
            })
          }
        </Grid>
      </Container>
    </>
  );
}

export default AllRecipes;
