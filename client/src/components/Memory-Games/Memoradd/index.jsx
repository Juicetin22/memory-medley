import React, { useState, useEffect, useRef } from "react";
import './index.scss';
import MemoraddCard from "./MemoraddCard";
import { Link } from "react-router-dom";
import { Card, Button, Overlay, Tooltip } from "react-bootstrap";
import Confetti from "react-confetti";
import classNames from "classnames";

// list of cards
const cardNumbers = [
  { "src": "https://img.icons8.com/small/512/000000/1.png", "value": 1 },
  { "src": "https://img.icons8.com/small/512/000000/2.png", "value": 2 },
  { "src": "https://img.icons8.com/small/512/000000/3.png", "value": 3 },
  { "src": "https://img.icons8.com/small/512/000000/4.png", "value": 4 },
  { "src": "https://img.icons8.com/small/512/000000/5.png", "value": 5 },
  { "src": "https://img.icons8.com/small/512/000000/6.png", "value": 6 },
  { "src": "https://img.icons8.com/small/512/000000/7.png", "value": 7 },
  { "src": "https://img.icons8.com/small/512/000000/8.png", "value": 8 },
  { "src": "https://img.icons8.com/small/512/000000/9.png", "value": 9 }
];

// card with number 0; not part of mapped number array below
const cardZero = { "src": "https://img.icons8.com/small/512/26e07f/0.png", "value": 10 };

const Memoradd = () => {
  // states that get updated as the game goes on
  const [cards, setCards] = useState([]);
  const [turn, setTurn] = useState(0);
  const [value, setValue] = useState(0);
  const [prevValue, setPrevValue] = useState(0);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  
  // states with initial values that decrease as the game goes on
  const [help, setHelp] = useState(2);
  const [lives, setLives] = useState(3);
  
  // states that affect the display of the game
  // reveal flips cards that are faced down
  const [reveal, setReveal] = useState(false);
  // prevents other cards from being flipped when current card is being flipped, set as true upon beginning new game
  const [transition, setTransition] = useState(true);

  // state and functions for end game
  const [end, setEnd] = useState(false);

  // confetti state
  const [confetti, setConfetti] = useState(false);

  // state and variable for help button
  const [helpShow, setHelpShow] = useState(false);
  const target = useRef(null);

  // shuffle cards and add an id to each card every new game, reset to initial states
  const shuffleCards = () => {
    const shuffledCards = [...cardNumbers, ...cardNumbers, ...cardNumbers, cardZero]
      .map(card => ({ card, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ card }) => card)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurn(0);
    setValue(0);
    setPrevValue(0);
    setScore(0);
    setHelp(2);
    setReveal(false);
    setLives(3);
    setTransition(true);
    setHistory([]);
    setEnd(false);
    setConfetti(false);
  };

  // set reveal to pass down to card component; decrease help/show cards counter by one
  const showCards = () => {
    setReveal(true);
    setHelp(prev => prev - 1);
  }

  // start the game
  useEffect(() => {
    shuffleCards();
  }, []);
  
  // if value is the same or one more than previous value, basically continue the game
  useEffect(() => {
    // if value set is equal to the previous value or more by one, set previous value to the current value, increase the score by the value, and add current value to the history array
    // if card value is not equal to or more than prevValue by one, lose one life and reset the current value to previous value
    if (value === prevValue || value === prevValue + 1) {
      setPrevValue(value);
      setScore(prev => prev + value);
      setHistory(prev => [...prev, value]);
    } else {
      setLives(prev => prev - 1);
      setValue(prevValue);
    }
  }, [turn]);

  // determine bonus points
  useEffect(() => {
    const h = history.length;

    // if last three values in history are equal to each other, give bonus points (ie. three of same numbers were flipped)
    if (h >= 3 && history[h - 1] === history[h - 2] && history[h - 1] === history[h - 3]) {
      setScore(prev => prev + 5);
    }
  }, [history]);

  // if user has no lives or the current value is 10, reveal cards, and the game ends
  useEffect(() => {
    if (lives === 0 || value === 10) {
      setReveal(true);
      setEnd(true);
    }

    if (value === 10 && prevValue === 9) {
      setConfetti(true);
    }
  }, [lives, value]);

  // className for lives depending on the number
  const lifeStatus = classNames({ "healthy": lives === 3, "sufficient": lives === 2, "danger": lives <= 1 });

  // map each card in the cards array and pass down props to the MemoraddCard component
  const displayNumbers = cards.map(card => {
    return (
      <MemoraddCard 
        key={card.id}
        card={card}
        value={value}
        reveal={reveal}
        lives={lives}
        end={end}
        transition={transition}
        setValue={setValue}
        setTurn={setTurn}
        setReveal={setReveal}
        setTransition={setTransition}
      />
    )
  })
  
  return (
    <div onClick={() => helpShow ? setHelpShow(false) : null}>
      <div className="top">
        <Link to="/memory-games" className="link"><button className="back-button">← Back</button></Link>
        <h4 className="memoradd-title">Mem<span className="o">0</span>radd</h4>
        <div>
          <button onClick={shuffleCards} className="new-game">New Game</button>
          <Button variant="outline-info" ref={target} onClick={() => setHelpShow(true)} className="game-help-button" >
                ?
              </Button>
          <Overlay target={target.current} show={helpShow} placement="left-start" className="instructions">
            {(props) => (
              <Tooltip className="mytooltip" id="overlay-example" {...props}>
                How to play:
                <div className="rules">
                  <p>- The purpose of the game is to score as many points as possible. Remember the placement of the cards, and start by flipping over a card with number 1 on it. From there, you can either flip over a card of the same number OR a card with a number that is one greater than the previous card.</p> 
                  <p>- Example flipping sequence: 1 - 1 - 1 - 2 - 3 - 4 - 4 ... - 9, and finally Card number 0.</p>
                  <p>- Lose one life when you flip over a card that does not follow the numerical pattern. However, the game ends when you flip over the number 0 card at any point in the game!</p>
                  <p>- Note: There's a way to get bonus points. Try to find it!</p>
                </div>
              </Tooltip>
            )}
          </Overlay>
        </div>
      </div>
      <div className="memoradd-body">
        <div className="memoradd-grid">
          {displayNumbers}
        </div>
        <div className="memoradd-right-side">
          <Card className="memoradd-card">
            <Card.Body>
              <p>Current Score: {score} </p>
              <p>Turn: {turn}</p>
              <p>Lives: <span className={lifeStatus}>{lives}</span></p>
            </Card.Body>
          </Card>
          {/* disable show cards button while cards are being revealed, during transition periods, or when help count is 0 */}
          <button onClick={showCards} disabled={reveal || !help || transition} className="show-cards">Show Cards</button>
          <p>Left: <span className={!help && "danger"}>{help}</span></p>
        </div>
      </div>

      { confetti ? <Confetti /> : null }
    </div>
  )
}

export default Memoradd;