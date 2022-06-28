import React, { useState, useEffect } from "react";
import "./NumberCard.scss";
import ReactCardFlip from "react-card-flip";

const NumberCard = (props) => {
  // props passed down from index
  const { card, value, setValue, setTurn, lives, end, transition, setTransition } = props;
  
  // states that alter display of cards
  // state that is used for ReactCardFlip
  const [flipped, setFlipped] = useState(false);
  // when a correct card is flipped, opened state is true, which affect the card's className
  const [opened, setOpened] = useState(false);

  const handleFlip = () => {
    // flip card when clicked on
    setFlipped(!flipped);
    setTransition(true);
    // set value state to the card's value, increase turn count by 1, which will trigger useEffect in index
    setValue(card.value);
    setTurn(prev => prev + 1);
    
    // if card value is 1 more than the current value, set the opened state for this card to true
    // if not and user still has lives, flip the card back face down
    if (card.value === value + 1) {
      setOpened(true);
      setTransition(false);
    } else {
      if (lives > 1) {
        setTimeout(() => {
          setFlipped(flipped);
          setTransition(false);
        }, 1500)
      }
    }
  }

  // game starts with cards face up, flip back down after 7 seconds
  useEffect(() => {
    setTimeout(() => {
      setFlipped(!flipped);
      setTransition(false);
    }, 7000);
  }, [])

  // reveal unflipped cards once game ends
  useEffect(() => {
    if (end && flipped) {
      setFlipped(!flipped);
    }
  }, [end])

  return (
    <div className={end ? "number end" : "number"}>
      <ReactCardFlip isFlipped={flipped}>
        <img 
          src={card.src} 
          alt="number-front" 
          className={opened ? "opened" : ""}
        />
        <img 
          src="https://img.icons8.com/glyph-neue/512/000000/christmas-penguin.png" 
          alt='number-back' 
          onClick={handleFlip}
          className={transition ? "transition" : ""}
        />
      </ReactCardFlip>
    </div>
  )
}

export default NumberCard;