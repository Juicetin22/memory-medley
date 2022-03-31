import React, { useEffect, useState } from "react";
import GameBoard from "../GameBoard";
import classNames from "classnames";
import { Link } from "react-router-dom";
import axios from "axios";

const Number = () => {
  const [position, setPosition] = useState({left: "50%", top: "50%", "background-color": "black"});
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(10);
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [prevScore, setPrevScore] = useState(0);

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
    
    if (!start) {
      setStart(true);
    }
  }

  const reset = () => {
    setPosition(prev => ({...prev, left: "50%", top: "50%", "background-color": "black"}));
    setScore(0);
    setTime(10);
    setStart(false);
    setEnd(false);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (start && time > 0) {
        setTime(prev => prev - 1)
      }
    }, 1000);

    // clean up setInterval - want to do this or else after rerender another setInterval will occur at same time, etc.
    return () => {
      clearInterval(interval)
    }
  }, [time, start]);

  useEffect(() => {
    if (time === 0) {
      setEnd(true);

      // axios.post("http://localhost:8080/classic_scores", { score, user_id: 1 })
      //   .then((res) => {
      //     setPrevScore(res.data.score);

      //     if (res.data.score > highScore) {
      //       setHighScore(res.data.score);
      //     }
      //   })
      //   .catch(err => console.log(err.message));
    }
  }, [time]);

  // useEffect(() => {
  //   axios.get("http://localhost:8080/number_scores/1/high")
  //     .then(res => {
  //       setHighScore(res.data.score);
  //     })
  //     .catch(err => console.log(err.message));

  //   axios.get("http://localhost:8080/number_scores/1/prev")
  //     .then(res => {
  //       setPrevScore(res.data.score);
  //     })
  //     .catch(err => console.log(err.message));
  // }, [])

  const classicPiece = classNames("classic-piece", { "end": end });
  
  return (
    <div>
      <div className="top">
        <Link to="/" className="link"><button className="back-button">← Back</button></Link>
        <h3 className="classic-game-header">Number Tap Game</h3>
        <button onClick={reset} className="new-game">New Game</button>
      </div>
      <div className="time-score">
        <p>Time Remaining: {time}</p>
        <p><strong>Score: {score}</strong></p>
      </div>
      <p className="scores"><span>High score: {highScore}</span><span>Previous score: {prevScore}</span></p>
      <GameBoard />
      <div className={classicPiece} style={position} onClick={reposition}></div>
    </div>
  )
}

export default Number;