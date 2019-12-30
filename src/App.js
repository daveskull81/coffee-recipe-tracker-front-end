import React, { useEffect } from 'react';
import Home from './components/Home';
import { useCookies } from 'react-cookie';

function App() {
  const [ cookies, setCookie ] = useCookies(['testing']);

  useEffect(() => {
    setCookie('testing', 'this is a test', { path: '/', httpOnly: true, sameSite: true });
  }, [setCookie])

  return (
    <div>
      <Home testProp={cookies.testing}/>
    </div>
  );
}

export default App;
