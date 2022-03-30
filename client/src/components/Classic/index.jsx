import React, { useEffect, useState } from "react";
import GameBoard from "../GameBoard";
import "./index.scss";

const Classic = () => {
  const [position, setPosition] = useState({left: "50%", top: "50%", "background-color": "black"});
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(100);

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

    setScore(prev => prev + 1);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) {
        setTime(prev => prev - 1)
      }
    }, 1000);

    // clean up setInterval - want to do this or else after rerender another setInterval will occur at same time, etc.
    return () => {
      clearInterval(interval)
    }
  }, [time]);
  
  return (
    <div>
      <h3 className="classic-game-header">Classic Tap Game</h3>
      <div className="time-score">
        <p>Time Remaining: {time}</p>
        <p><strong>Score: {score}</strong></p>
      </div>
      <GameBoard />
      <div className="classic-piece" style={position} onClick={reposition}></div>
    </div>
  )
}

export default Classic;