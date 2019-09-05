import React from 'react';
import logo from './logo.svg';
import './App.css';

import Map from "./components/Map"
import Player from "./components/Player"
import Room from "./components/Room"

function App() {
  return (
    <div className="App">
      <Map/>
      <Player/>
      <Room/>
    </div>
  );
}

export default App;
