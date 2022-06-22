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

  // Check if there is a obstacle at the provided coordinates.
// Returns a Boolean
const isThereObstacle = (x:Number, y:number) => {
  // Loop through obstacle, and check if any rock is at the given point.
  for (let i = 0; i < rocks.length; i++) {
    const rock = rocks[i];
    if (rock.x === x && rock.y === y) {
      return true;
    }
  }
  return false;
};
  return (
<div className="page-wrapper">

<div className="board" ref={board}>
     
        <div className={"character " }ref={character}></div>
      </div>

    </div>
  );
}

export default App;
