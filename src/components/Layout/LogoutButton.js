import React from 'react';
import { Button } from '@material-ui/core';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

const LogoutButton = () => {

    const userCookieLabel = process.env.REACT_APP_USER_COOKIE_NAME;
    // eslint-disable-next-line
    const [ cookies, setCookie, removeCookie ] = useCookies([userCookieLabel]);
    const history = useHistory();

    const logOutClickHandler = () => {
        removeCookie(userCookieLabel, { path: '/' })
        history.push('/login');    
    };

    return (
        <Button color='inherit' onClick={logOutClickHandler}>Logout</Button>
    );
};

export default LogoutButton;