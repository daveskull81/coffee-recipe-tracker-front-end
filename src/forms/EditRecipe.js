import React, { useState, useEffect } from 'react';
import apiRequest from '../utils/apiRequest';
import { 
    TextField,
    Button,
    Container,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Select,
    MenuItem
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';

const EditRecipe = ({ currentUser }) => {

    const [ recipe, setRecipe ] = useState({
        name: '',
        coffee_weight: 0,
        total_weight: 0,
        bloom: false,
        bloom_time: 0,
        bloom_weight: 0,
        time_minutes: 0,
        time_seconds: 0,
        grind_size: 'Fine',
        rating: 0,
        water_temp: 0
    });
    const [ selectedMethod, setSelectedMethod ] = useState({ name: ''});
    const [ methods, setMethods ] = useState([]);
    const [ selectedGrind, setSelectedGrind ] = useState('');
    const [ rating, setRating ] = useState(5);
    const [ coffees, setCoffees ] = useState([]);
    const [ selectedCoffee, setSelectedCoffee ] = useState({ name: '' });

    const history = useHistory();
    const { recipeId } = useParams();

    useEffect(() => {
        const getData = async () => {
            const { data: recipe } = await apiRequest(currentUser.token).get(`/users/${currentUser.id}/recipes/${recipeId}`);
            setRecipe(recipe);
            const { data: methods} = await apiRequest(currentUser.token).get(`/users/${currentUser.id}/methods`);
            setMethods(methods);
            setSelectedMethod(methods.find(method => method.id === recipe.method_id));
            const { data: coffees } = await apiRequest(currentUser.token).get(`/users/${currentUser.id}/coffees`);
            setCoffees(coffees);
            setSelectedCoffee(coffees.find(coffee => coffee.id === recipe.coffee_id));
        };
        getData();
    }, [currentUser.token, currentUser.id, recipeId]);

    const onChangeHandler = e => {
        setRecipe({
            ...recipe,
            [e.target.name]: e.target.value
        });
    };

    const bloomChangeHandler = e => {
        setRecipe({
            ...recipe,
            bloom: e.target.checked
        });
    };

    const methodChangeHandler = e => {
        const chosenMethod = methods.find(method => method.name === e.target.value);
        setSelectedMethod(chosenMethod);
    };

    const coffeeChangeHandler = e => {
        const chosenCoffee = coffees.find(coffee => coffee.name === e.target.value);
        setSelectedCoffee(chosenCoffee);
    };

    const grindChangeHandler = e => {
        setSelectedGrind(e.target.value);
    };

    const ratingChangehandler = e => {
        setRating(e.target.value);
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        delete recipe.id
        apiRequest(currentUser.token)
            .put(`/users/${currentUser.id}/recipes/${recipeId}`, { ...recipe, grind_size: selectedGrind, user_id: currentUser.id, method_id: selectedMethod.id, coffee_id: selectedCoffee.id })
            .then(() => {
                history.push(`/recipes/${recipeId}`);
            })
            .catch(err => {
                history.push('/login');
            });
    };

    const cancelClickHandler = () => {
        history.push(`/recipes/${recipeId}`);
    };

    return (
        <>
            <Container maxWidth='md'>
                <form onSubmit={onSubmitHandler}>
                    <TextField 
                        margin='normal'
                        label='Name'
                        name='name'
                        onChange={onChangeHandler}
                        value={recipe.name}
                        fullWidth
                        required
                    />
                    <TextField 
                        margin='normal'
                        label='Coffee Weight'
                        name='coffee_weight'
                        onChange={onChangeHandler}
                        value={recipe.coffee_weight}
                        fullWidth
                        type='number'
                    />
                    <TextField 
                        margin='normal'
                        label='Total Weight'
                        name='total_weight'
                        onChange={onChangeHandler}
                        value={recipe.total_weight}
                        fullWidth
                        type='number'
                    />
                    <FormControl>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={recipe.bloom} onChange={bloomChangeHandler} />}
                                label='Bloom'
                                labelPlacement='start'
                             />
                        </FormGroup>
                    </FormControl>
                    <TextField 
                        margin='normal'
                        label='Bloom Time'
                        name='bloom_time'
                        onChange={onChangeHandler}
                        value={recipe.bloom_time}
                        fullWidth
                        type='number'
                        disabled={!recipe.bloom}
                    />
                    <TextField 
                        margin='normal'
                        label='Bloom Weight'
                        name='bloom_weight'
                        onChange={onChangeHandler}
                        value={recipe.bloom_weight}
                        fullWidth
                        type='number'
                        disabled={!recipe.bloom}
                    />
                    <TextField 
                        margin='normal'
                        label='Time Minutes'
                        name='time_minutes'
                        onChange={onChangeHandler}
                        value={recipe.time_minutes}
                        fullWidth
                        type='number'
                    />
                    <TextField 
                        margin='normal'
                        label='Time Seconds'
                        name='time_minutes'
                        onChange={onChangeHandler}
                        value={recipe.time_minutes}
                        fullWidth
                        type='number'
                    />
                    <TextField 
                        margin='normal'
                        label='Water Temperature'
                        name='water_temp'
                        onChange={onChangeHandler}
                        value={recipe.water_temp}
                        fullWidth
                        type='number'
                    />
                    <FormControl>
                        <FormGroup>
                            <FormControlLabel 
                                label='Coffee' 
                                labelPlacement='top' 
                                control={
                                    <Select
                                        required
                                        onChange={coffeeChangeHandler}
                                        value={selectedCoffee.name}
                                    >
                                        {coffees.map(coffee => (
                                            <MenuItem value={coffee.name} key={coffee.id}>
                                                {coffee.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                }
                            />
                        </FormGroup>    
                    </FormControl>
                    <FormControl>
                        <FormGroup>
                            <FormControlLabel 
                                label='Brewing Method' 
                                labelPlacement='top' 
                                control={
                                    <Select
                                        required
                                        onChange={methodChangeHandler}
                                        value={selectedMethod.name}
                                    >
                                        {methods.map(method => (
                                            <MenuItem value={method.name} key={method.id}>
                                                {method.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                }
                            />
                        </FormGroup>    
                    </FormControl>
                    <FormControl>
                        <FormGroup>
                            <FormControlLabel 
                                label='Grind Size' 
                                labelPlacement='top' 
                                control={
                                    <Select
                                        displayEmpty
                                        onChange={grindChangeHandler}
                                        value={recipe.grind_size}
                                    >
                                        <MenuItem value={'Extra Fine'}>
                                            Extra Fine
                                        </MenuItem>
                                        <MenuItem value={'Fine'}>
                                            Fine
                                        </MenuItem>
                                        <MenuItem value={'Medium Fine'}>
                                            Medium Fine
                                        </MenuItem>
                                        <MenuItem value={'Medium'}>
                                            Medium
                                        </MenuItem>
                                        <MenuItem value={'Medium Coarse'}>
                                            Medium Coarse
                                        </MenuItem>
                                        <MenuItem value={'Coarse'}>
                                            Coarse
                                        </MenuItem>
                                        <MenuItem value={'Extra Coarse'}>
                                            Extra Coarse
                                        </MenuItem>
                                    </Select>
                                }
                            />
                        </FormGroup>    
                    </FormControl>
                    <FormControl>
                        <FormGroup>
                            <FormControlLabel 
                                label='Rating' 
                                labelPlacement='top' 
                                control={
                                    <Select
                                        displayEmpty
                                        onChange={ratingChangehandler}
                                        value={recipe.rating}
                                    >
                                        <MenuItem value={5}>
                                            5
                                        </MenuItem>
                                        <MenuItem value={4}>
                                            4
                                        </MenuItem>
                                        <MenuItem value={3}>
                                            3
                                        </MenuItem>
                                        <MenuItem value={2}>
                                            2
                                        </MenuItem>
                                        <MenuItem value={1}>
                                            1
                                        </MenuItem>
                                    </Select>
                                }
                            />
                        </FormGroup>    
                    </FormControl>
                    <Button color='primary' type='submit'>Update Recipe</Button>
                    <Button color='secondary' onClick={cancelClickHandler}>Cancel</Button>
                </form>
            </Container>
        </>
    );
};

export default EditRecipe;