import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import apiRequest from '../../utils/apiRequest';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

function Login() {

  const history = useHistory();
  const userCookieLabel = process.env.REACT_APP_USER_COOKIE_NAME;
  const [ user, setUser ] = useState({ username: '', password: '' });
  // eslint-disable-next-line
  const [ cookies, setCookie ] = useCookies([userCookieLabel]);
  const [ isError, setIsError ] = useState(false);

  const handleChange = e => {
    if (isError) {
      setIsError(false);
    }
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    apiRequest()
      .post('/auth/login', user)
      .then(res => {
        setCookie(userCookieLabel, res.data, { path: '/' });
        history.push('/home');
      })
      .catch(err => {
        if (err.response.status === 401) {
          setIsError(true);
        } else {
          alert('There was an error logging you in. Please wait and try again.');
        };
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <TextField 
          id='username'
          label='Username'
          name='username'
          variant='outlined'
          margin='normal'
          value={user.username}
          onChange={handleChange}
          helperText={isError ? 'Check username is correct' : ''}
          error={isError}
        />
      </div>
      <div>
        <TextField
          id='password'
          label='Password'
          type='password'
          name='password'
          variant='outlined'
          margin='normal'
          value={user.password}
          onChange={handleChange}
          helperText={isError ? 'Check password is correct' : ''}
          error={isError}
        />
      </div>
      <Button 
        variant='contained' 
        color='primary' 
        type='submit'
      >
        Login
      </Button>
    </form>
  );
}

export default Login;
