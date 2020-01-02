import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import apiRequest from '../../utils/apiRequest';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

function Login() {

  const history = useHistory();
  const userCookieLabel = process.env.REACT_APP_USER_COOKIE_NAME;
  const [ user, setUser ] = useState({ username: '', password: '' });
  const [ cookies, setCookie ] = useCookies([userCookieLabel]);

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value })
  };

  const onSubmit = e => {
    e.preventDefault();

    apiRequest()
      .post('/auth/login', user)
      .then(res => {
        console.log(res.data);
        setCookie(userCookieLabel, res.data, { path: '/' });
        history.push('/home');
      })
      .catch(err => console.log(err));
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <TextField 
          id='username'
          label='Username'
          name='username'
          variant='outlined'
          value={user.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          id='password'
          label='Password'
          type='password'
          name='password'
          variant='outlined'
          value={user.password}
          onChange={handleChange}
        />
      </div>
      <Button variant='contained' color='primary' type='submit'>Submit</Button>
    </form>
  );
}

export default Login;
