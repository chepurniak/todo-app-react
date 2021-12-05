import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './reset.scss';

function App() {

  const [colors, setColors] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/colors').then(({ data }) => {
      setColors(data);
    });
  }, []);



  return (
    <>
      {colors && colors.map(
        ({id, hex, name}) => (
          <p key={id}>
            Color name:  <span style={{color: hex}}>{name}</span>, 
            color hex: <span style={{color: hex}}>{hex}</span>
          </p>
        ))}
    </>
  );
}

export default App;