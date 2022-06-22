import React, { useEffect, useRef, useState } from 'react';

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


  
useEffect(()=>{
  let sec=false
    if(!sec){


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


  // Check if the provided coordinate is within the grid's bounds.
// Returns a Boolean
const isInGrid = (x:number, y:number) => {
  if (x < 0 || y < 0 || x > 12   || y > 12) {
    return false;
  }
  return true;
}



// Check if a player can move to the provided coordinates.
// Returns a Boolean
const canMoveTocoordinates = (x:number, y:number) => {
  // If the coordinate to move is outside of the grid,
  // the player can't move to it.
  if (!isInGrid(x, y)) {
    return false;
  }
  // If there is a rock at the coordinate, 
  // the player can't move to it.
  if (isThereObstacle(x, y)) {
    return false;
  }
  return true;
};

  // Move the character to an x,y grid coordinate.
// Returns nothing
const moveCharacterTo = (x:number, y:number) => {

  // Multiply the coordinates by 100 because each grid square
  // is 100x100 pixels in size.
 if  (null !== character.current) {
  character.current.style.top = (y * 100).toString() + 'px';
  character.current.style.left = (x * 100).toString() + 'px';
 

};
}

// Move the character left one tile, if Blerf can.
const turnLeft = () => {
  if(direction==="right")
  {
      SetDirection("top")
  }
  else  if(direction==="bottom"){
    SetDirection("right")
  }
  else  if(direction==="top"){
    SetDirection("left")
  }
  else if(direction==="left"){
    SetDirection("bottom")
  }
  console.log(direction)


}

// Move the character right one tile, if Blerf can.
const turnRight = () => {
  if(direction==="right")
  {
      SetDirection("bottom")
  }
  else  if(direction==="bottom"){
    SetDirection("left")
  }
  else  if(direction==="left"){
    SetDirection("top")
  }
  else  if(direction==="top"){
    SetDirection("right")
  }
 

}

// Move the character up one tile, if Blerf can.
const moveUp = () => {
  if(direction==="right")
  {
    if (canMoveTocoordinates(characterPos.x + 1, characterPos.y)) {
      characterPos.x += 1;
      moveCharacterTo(characterPos.x, characterPos.y);
    }
  }
  else  if(direction==="bottom"){
    if (canMoveTocoordinates(characterPos.x, characterPos.y + 1)) {
      characterPos.y += 1;
      moveCharacterTo(characterPos.x, characterPos.y);
    }
  }
  else  if(direction==="left"){
    if (canMoveTocoordinates(characterPos.x - 1, characterPos.y)) {
      characterPos.x -= 1;
      moveCharacterTo(characterPos.x, characterPos.y);
    }
  }
  else if(direction==="top"){
    if (canMoveTocoordinates(characterPos.x, characterPos.y - 1)) {
      characterPos.y -= 1;
      moveCharacterTo(characterPos.x, characterPos.y);
    }
  }

};

// Move the character down one tile, if Blerf can.
const moveDown = () => {
  if(direction==="left")
  {
    if (canMoveTocoordinates(characterPos.x + 1, characterPos.y)) {
      characterPos.x += 1;
      moveCharacterTo(characterPos.x, characterPos.y);
    }
  }
  else  if(direction==="top"){
    if (canMoveTocoordinates(characterPos.x, characterPos.y + 1)) {
      characterPos.y += 1;
      moveCharacterTo(characterPos.x, characterPos.y);
    }
  }
  else  if(direction==="right"){
    if (canMoveTocoordinates(characterPos.x - 1, characterPos.y)) {
      characterPos.x -= 1;
      moveCharacterTo(characterPos.x, characterPos.y);
    }
  }
  else  if(direction==="bottom"){
    if (canMoveTocoordinates(characterPos.x, characterPos.y - 1)) {
      characterPos.y -= 1;
      moveCharacterTo(characterPos.x, characterPos.y);
    }
  }
};



// Add an event listener for when the user presses keys.
document.body.addEventListener('keydown', evt => {
  const keyCode = evt.keyCode;
  // If the user pressed any directional keys, 
  // prevent the browser default of scrolling the page.
  if ([76, 70, 82, 66].includes(keyCode)) {
    evt.preventDefault();
  }
  // Attempt to move the character in the direction 
  switch (keyCode) {
    case 76:
      turnLeft();
      break;
    case 70:
      moveUp();
      console.log(characterPos,direction)
      break;
    case 82:
      turnRight();
      break;
    case 66:
      moveDown();
      console.log(characterPos,direction)
      break;
  }
});
    }
  return ()=>{
    sec=true
  }
})



  return (
    <div className="page-wrapper">

<div className="board" ref={board}>
        {rocks.map((elements)=>{
          return (<div className='rock' style={{top: elements.x*100+"px",left: elements.y*100+"px"}}></div>)
        })}
        <div className={"character " + (direction)}ref={character}></div>
      </div>

    </div>
  
  );
}


export default App;
