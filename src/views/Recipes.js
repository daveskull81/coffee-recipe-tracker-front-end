import React, { useState, useEffect } from 'react';
import apiRequest from '../utils/apiRequest';
import { Grid, Card, CardContent, CardActions, Button, Container } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom';

const Recipes = ({ currentUser }) => {
  
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

  const deleteHandler = recipeId => {
    apiRequest(currentUser.token)
      .delete(`/users/${currentUser.id}/recipes/${recipeId}`)
      .then(() => {
        const updatedRecipes = recipes.filter(recipe => recipe.id !== recipeId);
        setRecipes(updatedRecipes);
      })
      .catch(() => {
        history.push('/login');
      });
  };

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
                        <CardContent>
                          <p><strong>Name:</strong> {recipe.name}</p>
                          {/* Will use this code in single recipe view */}
                          {/* <p><strong>Coffee Weight:</strong> {recipe.coffee_weight}</p>
                          <p><strong>Total Weight:</strong> {recipe.total_weight}</p>
                          <p><strong>Bloom:</strong> {recipe.bloom ? 'Yes' : 'No'}</p>
                          <p><strong>Bloom Time:</strong> {recipe.bloom ? `${recipe.bloom_time} seconds` : 'n/a'}</p>
                          <p><strong>Bloom Weight:</strong> {recipe.bloom ? `${recipe.bloom_weight}` : 'n/a'}</p>
                          <p><strong>Total Time:</strong> {`${recipe.time_minutes} min(s) ${recipe.time_seconds} sec(s)`}</p>
                          <p><strong>Grind Size:</strong> {recipe.grind_size}</p>
                          <p><strong>Water Temperature:</strong> {recipe.water_temp}</p> */}
                          <p><strong>Rating:</strong> {recipe.rating}</p>
                        </CardContent>
                        <CardActions>
                          <Link to={`/recipes/edit/${recipe.id}`}><Button>Edit</Button></Link>
                          <Button color="secondary" onClick={() => deleteHandler(recipe.id)}>Delete</Button>
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

export default Recipes;
