import React from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const LoginButton = () => {
    const history = useHistory();

    const clickHandler = () => {
        history.push('/login');
    };

    return (
        <Button color='inherit' onClick={clickHandler}>Login</Button>
    );
};

export default LoginButton;