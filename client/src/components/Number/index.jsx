import React from "react";
import GameBoard from "../GameBoard";
import { Link } from "react-router-dom";

const Number = () => {
  
  return (
    <div>
      <div className="top">
        <Link to="/" className="link"><button className="back-button">← Back</button></Link>
        <h3 className="classic-game-header">Number Tap Game</h3>
        <button /*onClick={reset}*/ className="new-game">New Game</button>
      </div>
      {/* <div className="time-score">
        <p>Time Remaining: {time}</p>
        <p><strong>Score: {score}</strong></p>
      </div>
      <p className="scores"><span>High score: {highScore}</span><span>Previous score: {prevScore}</span></p> */}
      <GameBoard />
      {/* <div className={classicPiece} style={position} onClick={reposition}></div> */}
    </div>
  )
}

export default Number;