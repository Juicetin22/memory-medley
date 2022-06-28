import React, { useEffect, useState } from "react";
import GameBoard from "../GameBoard";
import "./index.scss";
import classNames from "classnames";
import { Link } from "react-router-dom";
// import Confetti from "react-confetti";
import axios from "axios";

const Number = () => {
  const [number, setNumber] = useState(0);
  const [position, setPosition] = useState({left: "50%", top: "50%", border: `2px gray solid`});
  const [fakeNumberOne, setFakeNumberOne] = useState(0);
  const [fakePositionOne, setFakePositionOne] = useState({left: "50%", top: "50%", border: `2px gray solid`});
  const [fakeNumberTwo, setFakeNumberTwo] = useState(0);
  const [fakePositionTwo, setFakePositionTwo] = useState({left: "50%", top: "50%", border: `2px gray solid`});
  const [time, setTime] = useState(50);
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);
  // const [confetti, setConfetti] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [prevScore, setPrevScore] = useState(0);
  const [allTime, setAllTime] = useState(0);

  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const reposition = () => {
    setNumber(prev => prev + 1);

    const numberLeft = random(15, 85);
    const numberTop = random(20, 80);

    let fakeOneLeft = random(15, 85);
    let fakeOneTop = random(20, 80);

    // while statements to prevent overlap of numbers on page
    while (Math.abs(numberLeft - fakeOneLeft) < 3) {
      fakeOneLeft = random(15, 85);
    }

    while (Math.abs(numberTop - fakeOneTop) < 5) {
      fakeOneTop = random(20, 80);
    }

    let fakeTwoLeft = random(15, 85);
    let fakeTwoTop = random(20, 80);

    while (Math.abs(numberLeft - fakeTwoLeft) < 3 || Math.abs(fakeOneLeft - fakeTwoLeft) < 3) {
      fakeTwoLeft = random(15, 85);
    }

    while (Math.abs(numberTop - fakeTwoTop) < 5 || Math.abs(fakeOneTop - fakeTwoTop) < 5) {
      fakeTwoTop = random(20, 80);
    }

    setPosition(prev => ({
      ...prev, 
      left: `${numberLeft}%`, 
      top: `${numberTop}%`, 
      border: `2px rgb(${random(0, 250)}, ${random(0, 250)}, ${random(0, 250)}) solid`
    }));
    
    if (!start) {
      setStart(true);
    }

    // increase difficulty after reaching a point
    if (number >= 14) {
      // setting state is async so this if statement will occur before the new number is set, which is why we need to see the fake to the 'current' number or number + 2 (which is actually one less or one more respectively)
      setFakeNumberOne(number);
      setFakePositionOne({ 
        left: `${fakeOneLeft}%`, 
        top: `${fakeOneTop}%`, 
        border: `2px rgb(${random(0, 250)}, ${random(0, 250)}, ${random(0, 250)}) solid`
      })
      setFakeNumberTwo(number + 2);
      setFakePositionTwo({ 
        left: `${fakeTwoLeft}%`, 
        top: `${fakeTwoTop}%`, 
        border: `2px rgb(${random(0, 250)}, ${random(0, 250)}, ${random(0, 250)}) solid`
      })

    } else if (number >= 9) {
      // set fake numbers that aren't equal to the current number
      const fakeOne = random(1, 99);
      const fakeTwo = random(1, 99);
      setFakeNumberOne(fakeOne === number ? fakeOne - 1 : fakeOne);
      setFakePositionOne({ 
        left: `${fakeOneLeft}%`, 
        top: `${fakeOneTop}%`, 
        border: `2px rgb(${random(0, 250)}, ${random(0, 250)}, ${random(0, 250)}) solid`
      })
      setFakeNumberTwo(fakeTwo === number ? fakeTwo - 1 : fakeTwo);
      setFakePositionTwo({ 
        left: `${fakeTwoLeft}%`, 
        top: `${fakeTwoTop}%`, 
        border: `2px rgb(${random(0, 250)}, ${random(0, 250)}, ${random(0, 250)}) solid`
      })

    } else if (number >= 4) {
      // set a fake number that isn't equal to the current number
      const fake = random(1, 99);
      setFakeNumberOne(fake === number ? fake - 1 : fake);
      setFakePositionOne({ 
        left: `${fakeOneLeft}%`, 
        top: `${fakeOneTop}%`, 
        border: `2px rgb(${random(0, 250)}, ${random(0, 250)}, ${random(0, 250)}) solid`
      })
    }
  }

  const reset = () => {
    setNumber(0);
    setPosition(prev => ({...prev, left: "50%", top: "50%", border: `2px gray solid`}));
    setTime(50);
    setStart(false);
    setEnd(false);
    // setConfetti(false);
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
      // setConfetti(true);

      axios.post("http://localhost:8080/number_scores", { score: number, user_id: 1 })
        .then((res) => {
          setPrevScore(res.data.score);

          if (res.data.score > highScore) {
            setHighScore(res.data.score);
          }
        })
        .catch(err => console.log(err.message));
    }
  }, [time]);

  useEffect(() => {
    // axios.get("http://localhost:8080/number_scores/1/high")
    //   .then(res => {
    //     setHighScore(res.data.score);
    //   })
    //   .catch(err => console.log(err.message));

    // axios.get("http://localhost:8080/number_scores/1/prev")
    //   .then(res => {
    //     setPrevScore(res.data.score);
    //   })
    //   .catch(err => console.log(err.message));

    // axios.get("http://localhost:8080/number_scores/all_time")
    //   .then(res => {
    //     setAllTime(res.data.score);
    //   })
    //   .catch(err => console.log(err.message));

    Promise.all([
      axios.get("http://localhost:8080/number_scores/1/high"),
      axios.get("http://localhost:8080/number_scores/1/prev"),
      axios.get("http://localhost:8080/number_scores/all_time")
    ]).then((res) => {
      console.log(res);
      // ternary condition to take into consideration no high/previous scores for user
      setHighScore(res[0].data ? res[0].data.score : 0);
      setPrevScore(res[1].data ? res[1].data.score : 0);
      setAllTime(res[2].data.score);
    }).catch(err => console.log(err.message));

  }, [])

  const numberPiece = classNames("number-piece", { "end": end });
  
  return (
    <div>
      <div className="top">
        <Link to="/tap-game" className="link"><button className="back-button">← Back</button></Link>
        <h3 className="game-header">Number Tap Game</h3>
        <button onClick={reset} className="new-game">New Game</button>
      </div>
      <div className="time-score">
        <p>Time Remaining: {time}</p>
        <p className="number-scores"><span>Your high score: {highScore}</span><span>Previous score: {prevScore}</span></p>
      </div>
      <p className="all-time">All-time high score: {allTime}</p>
      <GameBoard />
      <div className={numberPiece} style={position} onClick={reposition}><strong>{number}</strong></div>
      {number >= 5 && 
      <div className={numberPiece} style={fakePositionOne}><strong>{fakeNumberOne}</strong></div>
      }
      {number >= 10 && 
      <div className={numberPiece} style={fakePositionTwo}><strong>{fakeNumberTwo}</strong></div>
      }
      {/* { confetti ? <Confetti /> : null } */}
    </div>
  )
}

export default Number;