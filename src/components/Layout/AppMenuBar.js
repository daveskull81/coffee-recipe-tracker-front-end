import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const AppMenuBar = ({ headingText }) => {

    const [ anchorEl, setAnchorEl ] = useState(null);
    const [ cookies ] = useCookies([process.env.REACT_APP_USER_COOKIE_NAME]);

    const menuClickHandler = e => {
        setAnchorEl(e.currentTarget);
    };

    const menuCloseHandler = e => {
        setAnchorEl(null);
    };

    return (
        <AppBar position='static'>
            <Toolbar>
                <IconButton onClick={menuClickHandler} edge='start' color='inherit' aria-label='menu'>
                    <MenuIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={menuCloseHandler}
                >
                    <MenuItem onClick={menuCloseHandler} component={Link} to='/home'>Home</MenuItem>
                    <MenuItem onClick={menuCloseHandler} component={Link} to='/coffees'>Coffees</MenuItem>
                    <MenuItem onClick={menuCloseHandler} component={Link} to='/methods'>Methods</MenuItem>
                    <MenuItem onClick={menuCloseHandler} component={Link} to='/recipes'>Recipes</MenuItem>
                </Menu>
                <Typography variant='h5'>
                    Coffee Recipe Tracker
                </Typography>
                { Object.keys(cookies).length === 0 && cookies.constructor === Object ?
                 <LoginButton /> : <LogoutButton />
                }
            </Toolbar>
        </AppBar>
    );
};

export default AppMenuBar;