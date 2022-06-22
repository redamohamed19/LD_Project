import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const character=useRef<HTMLDivElement>(null)
  const board=useRef<HTMLDivElement>(null)
  const [characterPos,SetcharacterPos]=useState( {
    x: 0,
    y: 0
  })
  const [rocks,Setrocks]=useState([
    {x: 1, y: 1},
    {x: 2, y: 2},
    {x: 2, y: 3},
    {x: 5, y: 5}
  ])
  const [direction,SetDirection]=useState("right")
  return (
<div className="page-wrapper">

<div className="board" ref={board}>
     
        <div className={"character " }ref={character}></div>
      </div>

    </div>
  );
}

export default App;
