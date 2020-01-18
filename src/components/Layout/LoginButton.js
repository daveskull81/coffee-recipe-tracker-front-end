import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const LoginButton = () => {
    return (
        <Link to='/login'>
            <Button color='primary'>Login</Button>
        </Link>
    );
};

export default LoginButton;