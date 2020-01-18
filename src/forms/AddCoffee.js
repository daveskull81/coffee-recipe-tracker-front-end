import React, { useState } from 'react';
import apiRequest from '../utils/apiRequest';
import { TextField, Button, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const AddCoffee = ({ currentUser }) => {

    const [ coffee, setCoffee ] = useState({
        name: '',
        roaster: '',
        country_of_origin: '',
        region: '',
        processing_method: '',
        roast_level: ''
    });

    const history = useHistory();

    const onChangeHandler = e => {
        setCoffee({
            ...coffee,
            [e.target.name]: e.target.value
        });
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        apiRequest(currentUser.token)
            .post(`/users/${currentUser.id}/coffees`, { ...coffee, user_id: currentUser.id })
            .then(() => {
                setCoffee({
                    name: '',
                    roaster: '',
                    country_of_origin: '',
                    region: '',
                    processing_method: '',
                    roast_level: ''
                });
                history.push('/coffees');
            })
            .catch(err => {
                history.push('/login');
            });
    };

    const cancelClickHandler = () => {
        history.push('/coffees');
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
                        value={coffee.name}
                        fullWidth
                    >
                    </TextField>
                    <TextField
                        margin='normal'
                        required label='Roaster'
                        name='roaster'
                        onChange={onChangeHandler}
                        value={coffee.roaster}
                        fullWidth
                    >
                    </TextField>
                    <TextField 
                        margin='normal' 
                        label='Country of Origin'
                        name='country_of_origin'
                        onChange={onChangeHandler}
                        value={coffee.country_of_origin}
                        fullWidth
                    >
                    </TextField>
                    <TextField 
                        margin='normal' 
                        label='Region'
                        name='region'
                        onChange={onChangeHandler}
                        value={coffee.region}
                        fullWidth
                    >
                    </TextField>
                    <TextField 
                        margin='normal' 
                        label='Processing Method'
                        name='processing_method'
                        onChange={onChangeHandler}
                        value={coffee.processing_method}
                        fullWidth
                    >
                    </TextField>
                    <TextField 
                        margin='normal' 
                        label='Roast Level'
                        name='roast_level'
                        onChange={onChangeHandler}
                        value={coffee.roast_level}
                        fullWidth
                    >
                    </TextField>
                    <Button color='primary' type='submit'>Add Coffee</Button>
                    <Button color='secondary' onClick={cancelClickHandler}>Cancel</Button>
                </form>
            </Container>
        </>
    );
};

export default AddCoffee;