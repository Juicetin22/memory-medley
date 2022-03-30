import React, { useState } from "react";
import GameBoard from "../GameBoard";
import "./index.scss";

const Classic = () => {
  const [position, setPosition] = useState({left: "50%", top: "50%", "background-color": "black"});

  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const reposition = () => {
    setPosition(prev => ({
      ...prev, 
      left: `${random(15, 85)}%`, 
      top: `${random(20, 80)}%`, 
      "background-color": `rgb(${random(0, 250)}, ${random(0, 250)}, ${random(0, 250)}`
    }));
  }
  
  return (
    <div>
      <GameBoard />
      <div className="classic-piece" style={position} onClick={reposition}></div>
    </div>
  )
}

export default Classic;