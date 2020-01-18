import React, { useState } from 'react';
import apiRequest from '../utils/apiRequest';
import { TextField, Button, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const AddMethod = ({ currentUser }) => {

    const [ method, setMethod ] = useState({
        name: ''
    });

    const history = useHistory();

    const onChangeHandler = e => {
        setMethod({
            ...method,
            [e.target.name]: e.target.value
        });
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        apiRequest(currentUser.token)
            .post(`/users/${currentUser.id}/methods`, { ...method, user_id: currentUser.id })
            .then(() => {
                setMethod({
                    name: ''
                });
                history.push('/methods');
            })
            .catch(() => {
                history.push('/login');
            });
    };

    const cancelClickHandler = () => {
        history.push('/methods');
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
                        value={method.name}
                        fullWidth
                    >
                    </TextField>
                    <Button color='primary' type='submit'>Add Method</Button>
                    <Button color='secondary' onClick={cancelClickHandler}>Cancel</Button>
                </form>
            </Container>
        </>
    );
};

export default AddMethod;