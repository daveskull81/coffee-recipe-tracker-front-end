import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import apiRequest from '../utils/apiRequest';
import { TextField, Button } from '@material-ui/core';

const EditCoffee = ({ currentUser }) => {

    const { coffeeId } = useParams();
    
    const [ coffee, setCoffee ] = useState({
        name: '',
        roaster: '',
        country_of_origin: '',
        region: '',
        processing_method: '',
        roast_level: ''
    });

    const history = useHistory();

    useEffect(() => {
        apiRequest(currentUser.token)
            .get(`/users/${currentUser.id}/coffees/${coffeeId}`)
            .then(res => {
                setCoffee({
                    name: res.data.name,
                    roaster: res.data.roaster,
                    country_of_origin: res.data.country_of_origin,
                    region: res.data.region,
                    processing_method: res.data.processing_method,
                    roast_level: res.data.roast_level
                })
            })
            .catch(() => {
                history.push('/login');
            });
    }, [coffeeId, currentUser.id, currentUser.token, history]);

    const onChangeHandler = e => {
        setCoffee({
            ...coffee,
            [e.target.name]: e.target.value
        });
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        apiRequest(currentUser.token)
            .put(`/users/${currentUser.id}/coffees/${coffeeId}`, { ...coffee, user_id: currentUser.id })
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

    return (
        <>
            <h2>Edit Coffee</h2>
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
                <Button color='primary' type='submit'>Update Coffee</Button>
            </form>
        </>
    );
};

export default EditCoffee;