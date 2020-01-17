import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import LogoutButton from './LogoutButton';

const AppMenuBar = ({ headingText }) => {
    return (
        <AppBar position='static'>
            <Toolbar>
                <IconButton edge='start' color='inherit' aria-label='menu'>
                    <MenuIcon />
                </IconButton>
                <Typography variant='h5'>
                    {headingText}
                </Typography>
                <LogoutButton />
            </Toolbar>
        </AppBar>
    );
};

export default AppMenuBar;