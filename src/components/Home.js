import React from 'react';

function App(props) {
  return (
    <div>
      <h1>Home</h1>
      <p>Cards linking to Coffess, Methods, and Recpies.</p>
      <p>{props.testProp}</p>
    </div>
  );
}

export default App;
