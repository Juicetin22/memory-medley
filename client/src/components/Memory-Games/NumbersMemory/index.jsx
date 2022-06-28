import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import NumberCard from "./NumberCard";
import { Button, Overlay, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";

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
  { "src": "https://img.icons8.com/small/512/000000/9.png", "value": 9 },
  { "src": "https://img.icons8.com/material/480/fa314a/ksi.png", "value": 100 },
  { "src": "https://img.icons8.com/material/480/fa314a/ksi.png", "value": 200 },
  { "src": "https://img.icons8.com/material/480/fa314a/ksi.png", "value": 300 },
  { "src": "https://img.icons8.com/material/480/fa314a/ksi.png", "value": 400 },
  { "src": "https://img.icons8.com/material/480/fa314a/ksi.png", "value": 500 },
  { "src": "https://img.icons8.com/material/480/fa314a/ksi.png", "value": 600 }
];

const NumbersMemory = () => {
  // states that get updated as the game goes on
  const [cards, setCards] = useState([]);
  const [turn, setTurn] = useState(0);
  const [value, setValue] = useState(0);
  const [prevValue, setPrevValue] = useState(0);

  // state with initial value that decrease as the game goes on
  const [lives, setLives] = useState(2);

  // states that affect the display of the game
  // signifies end of the game
  const [end, setEnd] = useState(false);

  // state and variable for help button
  const [helpShow, setHelpShow] = useState(false);
  const target = useRef(null);

  // prevents other cards from being flipped when current card is being flipped, set as true upon beginning new game
  const [transition, setTransition] = useState(true);

  const [confetti, setConfetti] = useState(false);

  // shuffle cards and add an id to each card every new game, reset to initial states
  const shuffleCards = () => {
    const shuffledCards = [...cardNumbers]
      .map(card => ({ card, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ card }) => card)
      .map((card) => ({ ...card, id: Math.random() }));

    setValue(0);
    setTurn(0);
    setPrevValue(0);
    setLives(2);
    setCards(shuffledCards);
    setEnd(false);
    setTransition(true);
  };

  // gets run each turn
  useEffect(() => {
    // if card number 9 gets flipped in order, set finish state to true and show modal
    if (value === 9 && prevValue === 8) {
      setEnd(true);
      setConfetti(true);
    }

    // if card flip is in correct order, increase prevValue by 1
    // if incorrect card is flipped, decrease lives by 1, set value back to previous value (which is stored in prevValue)
    if (value === prevValue + 1) {
      setPrevValue(prev => prev + 1);
    } else if (value) {
      setLives(prev => prev - 1);
      setValue(prevValue);
    }

  }, [turn])

  // start the game
  useEffect(() => {
    shuffleCards();
  }, []);

  // when lives reaches 0, set end state to true, which gets passed down to NumberCard component
  useEffect(() => {
    if (lives === 0) {
      setEnd(true);
    } else {
      setEnd(false);
    }
  }, [lives])

  // map each card in the cards array and pass down props to the NumberCard component
  const displayNumbers = cards.map(card => {
    return (
      <NumberCard 
        key={card.id}
        card={card}
        value={value}
        setTurn={setTurn}
        setValue={setValue}
        lives={lives}
        end={end}
        transition={transition}
        setTransition={setTransition}
      />
    )
  })
  
  return (
    <div onClick={() => helpShow ? setHelpShow(false) : null}>
      <div className="top">
        <Link to="/memory-games" className="link"><button className="back-button">← Back</button></Link>
        <h4 className="number-title">Number Memory Game</h4>
        <div>
          <button onClick={shuffleCards} className="new-game">New Game</button>
          <Button variant="outline-info" ref={target} onClick={() => setHelpShow(true)} className="game-help-button" >
                ?
              </Button>
          <Overlay target={target.current} show={helpShow} placement="left-start" className="instructions">
            {(props) => (
              <Tooltip id="overlay-example" {...props}>
                How to play:
                <div className="rules">
                  <p>- Memorize the placement of the cards. Once they are face down, try to flip the cards in the correct order starting from 1 all the way to 9. Be careful flipping the X cards!</p>
                </div>
              </Tooltip>
            )}
          </Overlay>
        </div>
      </div>
      <div className="number-grid">
        {displayNumbers}
      </div>
      <p>Lives: {lives}</p>

      { confetti ? <Confetti /> : null }
    </div>
  )
}

export default NumbersMemory;