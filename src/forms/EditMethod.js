import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import apiRequest from '../utils/apiRequest';
import { TextField, Button } from '@material-ui/core';

const EditMethod = ({ currentUser }) => {

    const { methodId } = useParams();
    
    const [ method, setMethod ] = useState({
        name: ''
    });

    const history = useHistory();

    useEffect(() => {
        apiRequest(currentUser.token)
            .get(`/users/${currentUser.id}/methods/${methodId}`)
            .then(res => {
                setMethod({
                    name: res.data.name
                })
            })
            .catch(() => {
                history.push('/login');
            });
    }, [methodId, currentUser.id, currentUser.token, history]);

    const onChangeHandler = e => {
        setMethod({
            [e.target.name]: e.target.value
        });
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        apiRequest(currentUser.token)
            .put(`/users/${currentUser.id}/methods/${methodId}`, { ...method, user_id: currentUser.id })
            .then(() => {
                setMethod({
                    name: ''
                });
                history.push('/methods');
            })
            .catch(err => {
                history.push('/login');
            });
    };

    const cancelClickHandler = () => {
        history.push('/methods');
    };

    return (
        <>
            <h2>Edit Method</h2>
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
                <Button color='primary' type='submit'>Update Method</Button>
                <Button color='secondary' onClick={cancelClickHandler}>Cancel</Button>
            </form>
        </>
    );
};

export default EditMethod;