import React, { useState, useEffect } from 'react';
import apiRequest from '../utils/apiRequest';
import { Grid, Card, CardContent, CardActions, Button, Container } from '@material-ui/core'
import { Link, useHistory, useParams } from 'react-router-dom';
import Notes from '../components/Notes/Notes';

const SingleRecipe = ({ currentUser }) => {
  
  const [ recipe, setRecipe ] = useState(
    {
        'name': '',
        'coffee_weight': '',
        'total_weight': '',
        'bloom': '',
        'bloom_time': '',
        'bloom_weight': '',
        'time_minutes': '',
        'time_seconds': '',
        'grind_size': '',
        'rating': '',
        'water_temp': '',
        'coffee_id': '',
        'method_id': ''
      }
  );
  const [ method, setMethod ] = useState(
    {
        "name": ""
    }
  );
  const [ coffee, setCoffee ] = useState(
    {
        'name': '',
        'roaster': '',
        'country_of_origin': '',
        'region': '',
        'processing_method': '',
        'roast_level': ''
      }
  );
  const [ notes, setNotes ] = useState(
    [
        {
          'text': ''
        }
      ]
  );
  const { recipeId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const getRecipeData = async () => {
        const { data: recipe } = await apiRequest(currentUser.token).get(`/users/${currentUser.id}/recipes/${recipeId}`);
        setRecipe(recipe);
        const { data: method } = await apiRequest(currentUser.token).get(`/users/${currentUser.id}/methods/${recipe.method_id}`);
        setMethod(method);
        const { data: coffee } = await apiRequest(currentUser.token).get(`/users/${currentUser.id}/coffees/${recipe.coffee_id}`);
        setCoffee(coffee);
        const { data: notes } = await apiRequest(currentUser.token).get(`/users/${currentUser.id}/recipes/${recipeId}/notes`);
        setNotes(notes);
    };

    getRecipeData();
  }, [setRecipe, setMethod, setCoffee, currentUser.token, currentUser.id, history, recipeId]);

  const deleteHandler = () => {
    apiRequest(currentUser.token)
      .delete(`/users/${currentUser.id}/recipes/${recipeId}`)
      .then(() => {
        history.push('/recipes');
      })
      .catch(() => {
        history.push('/login');
      });
  };

  if (!recipe) {
    return (
      <>
        <h2>...Loading Recipe</h2>
      </>
    );
  }

  return (
    <>
      <Container maxWidth='lg'>
      <Grid container justify='flex-start' alignItems='center'>
          <Grid item xs={3}>
            <Link to='/recipes'>
              <Button color='primary'>Back</Button>
            </Link>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
            <Grid item xs={12} key={recipe.id}>
                <Card>
                    <CardContent>
                        <p><strong>Name:</strong> {recipe.name}</p>
                        <p><strong>Coffee Weight:</strong> {`${recipe.coffee_weight} grams`}</p>
                        <p><strong>Total Weight:</strong> {`${recipe.total_weight} grams`}</p>
                        <p><strong>Bloom:</strong> {recipe.bloom ? 'Yes' : 'No'}</p>
                        <p><strong>Bloom Time:</strong> {recipe.bloom ? `${recipe.bloom_time} seconds` : 'n/a'}</p>
                        <p><strong>Bloom Weight:</strong> {recipe.bloom ? `${recipe.bloom_weight}` : 'n/a'}</p>
                        <p><strong>Total Time:</strong> {`${recipe.time_minutes} min(s) ${recipe.time_seconds} sec(s)`}</p>
                        <p><strong>Grind Size:</strong> {recipe.grind_size}</p>
                        <p><strong>Water Temperature:</strong> {`${recipe.water_temp}° F`}</p>
                        <p><strong>Coffee:</strong> {coffee.name}</p>
                        <p><strong>Method:</strong> {method.name}</p>
                        <p><strong>Rating:</strong> {recipe.rating}</p>
                        <Notes notes={notes} />
                    </CardContent>
                    <CardActions>
                        <Link to={`/recipes/edit/${recipe.id}`}><Button>Edit</Button></Link>
                        <Button color="secondary" onClick={deleteHandler}>Delete Recipe</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default SingleRecipe;
