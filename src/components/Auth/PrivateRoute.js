import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [ cookies ] = useCookies(['crt-user']);
    return (
        <Route {...rest} render={props => {
                //cookies is an empty object if no cookies are set
                //Need to test if cookies object contains any properties
                //by getting an array of its keys and checking if the length
                //is greater than 0
                //Also test for the object's constructor to confirm it was Object
                //This tests for an edge case where a new Date object would 
                //give 0 when checking this length and will help be more
                //confident the object is truly empty
                if (Object.keys(cookies).length === 0 && cookies.constructor === Object) {
                    return <Redirect to='/login' />
                } else {
                    return <Component {...props} />
                }
            }
        } />
    );
};

export default PrivateRoute;