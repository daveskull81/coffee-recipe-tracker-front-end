import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import LogoutButton from './LogoutButton';
import { Link } from 'react-router-dom';

const AppMenuBar = ({ headingText }) => {

    const [ anchorEl, setAnchorEl ] = useState(null);

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
                    <MenuItem onClick={menuCloseHandler}><Link to='/home'>Home</Link></MenuItem>
                    <MenuItem onClick={menuCloseHandler}><Link to='/coffees'>Coffees</Link></MenuItem>
                    <MenuItem onClick={menuCloseHandler}><Link to='/methods'>Methods</Link></MenuItem>
                    <MenuItem onClick={menuCloseHandler}><Link to='/recipes'>Recipes</Link></MenuItem>
                </Menu>
                <Typography variant='h5'>
                    {headingText}
                </Typography>
                <LogoutButton />
            </Toolbar>
        </AppBar>
    );
};

export default AppMenuBar;