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
    {x: 3, y: 3},
  
  ])
  let height=6;
  let width=6;
  
  const [direction,SetDirection]=useState("right")
  console.log(characterPos,direction)

// Check if there is a obstacle at the provided coordinates.
// Returns a Boolean
const isThereObstacle = (x:Number, y:number) => {
  // Loop through obstacle, and check if any rock is at the given point.
  for (let i = 0; i < rocks.length; i++) {
    const rock = rocks[i];
    if (rock.x === x && rock.y === y) {
      alert("Warning a obstacle is in["+rock.x+rock.y+"] position")
      return true;
    }
  }
  return false;
};

  // Check if the provided coordinate is within the grid's bounds.
// Returns a Boolean
const isInGrid = (x:number, y:number) => {
  if (x < 0 || y < 0 || x > width   || y > height) {
    if(x>width){
      SetcharacterPos((characterPos)=>({
        x:-1,
        y:characterPos.y
      }))
    }
    if(y>height){
      SetcharacterPos((characterPos)=>({
        x:characterPos.x,
        y:-1
      }))
    }

    if(x<0){
      SetcharacterPos((characterPos)=>({
        x:width+1,
        y:characterPos.y
      }))
    }
    if(y<0){
      SetcharacterPos((characterPos)=>({
       x:characterPos.x,
       y:height+1
      }))
    }

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
  console.log(direction)
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
  


}

// Move the character right one tile, if Blerf can.
const turnRight = () => {
  console.log(direction)
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
      SetcharacterPos((characterPos)=>({
        x:characterPos.x+1,
        y:characterPos.y
      }))
      
      moveCharacterTo(characterPos.x+1, characterPos.y);
    }
  }
  else  if(direction==="bottom"){
    if (canMoveTocoordinates(characterPos.x, characterPos.y + 1)) {
      SetcharacterPos((characterPos)=>({
        x:characterPos.x,
        y:characterPos.y+1
      }))
      moveCharacterTo(characterPos.x, characterPos.y+1);
    }
  }
  else  if(direction==="left"){
    if (canMoveTocoordinates(characterPos.x - 1, characterPos.y)) {
      SetcharacterPos((characterPos)=>({
        x:characterPos.x-1,
        y:characterPos.y
      }))
      moveCharacterTo(characterPos.x-1, characterPos.y);
    }
  }
  else if(direction==="top"){
    if (canMoveTocoordinates(characterPos.x, characterPos.y - 1)) {
      SetcharacterPos((characterPos)=>({
        x:characterPos.x,
        y:characterPos.y-1
      }))
      moveCharacterTo(characterPos.x, characterPos.y-1);
    }
  }

};

// Move the character down one tile, if Blerf can.
const moveDown = () => {
  if(direction==="left")
  {
    if (canMoveTocoordinates(characterPos.x + 1, characterPos.y)) {
      SetcharacterPos((characterPos)=>({
        x:characterPos.x+1,
        y:characterPos.y
      }))
      moveCharacterTo(characterPos.x+1, characterPos.y);
    }
  }
  else  if(direction==="top"){
    if (canMoveTocoordinates(characterPos.x, characterPos.y + 1)) {
      SetcharacterPos((characterPos)=>({
        x:characterPos.x,
        y:characterPos.y+1
      }))
      moveCharacterTo(characterPos.x, characterPos.y+1);
    }
  }
  else  if(direction==="right"){
    if (canMoveTocoordinates(characterPos.x - 1, characterPos.y)) {
      SetcharacterPos((characterPos)=>({
        x:characterPos.x-1,
        y:characterPos.y
      }))
      moveCharacterTo(characterPos.x-1, characterPos.y);
    }
  }
  else  if(direction==="bottom"){
    if (canMoveTocoordinates(characterPos.x, characterPos.y - 1)) {
      SetcharacterPos((characterPos)=>({
        x:characterPos.x,
        y:characterPos.y-1
      }))
      moveCharacterTo(characterPos.x, characterPos.y-1);
    }
  }
};


const handleKeyDown=(evt:any)=>{
  const keyCode = evt.keyCode;


  // Attempt to move the character in the direction 
  switch (keyCode) {
    case 76:
      turnLeft();
      break;
    case 70:
      moveUp();
     
      break;
    case 82:
      turnRight();
      break;
    case 66:
      moveDown();
   
      break;
  }
};
useEffect(()=>{












// Add an event listener for when the user presses keys.
window.addEventListener('keydown', handleKeyDown);
    
return () => {
  window.removeEventListener('keydown', handleKeyDown);
};
})



  return (
    <div className="page-wrapper">

<div className="board" style={{height: (height+1)*100,width: (width+1)*100}} ref={board}>
        {rocks.map((elements)=>{
          return (<div className='rock' key={elements.x+elements.y} style={{top: elements.x*100+"px",left: elements.y*100+"px"}}></div>)
        })}
        <div className={"character " + (direction)}ref={character}></div>
      </div>

    </div>
  
  );
}


export default App;
