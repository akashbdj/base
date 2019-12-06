import React, { useEffect, useState } from 'react';
import Logo from './Components/Logo/Logo'
import Message from './Components/Message/Message'
import Card from './Components/Card/Card'

import './App.scss';

function App() {
  let [data, setData] = useState({})

  useEffect(() => {
    // I'm serving the request.json file
    // through a local server to test.
    // Replace this with your endpoint
    // to test other responses.
    fetch('/yo')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(e => console.log("error", e))
  }, [])

  return (
    <div className="App">
      <div className="container">
        <Logo></Logo>
        <Message></Message>
        <Card data={data}></Card>
      </div>
    </div>
  );
}

export default App;
