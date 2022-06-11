import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import GameButton from "./GameButton";
import "./index.scss";

const gameList = [
  { "gamePath": "matching-cards", "gameTitle": "Matching Cards", "gameId": 1 },
  { "gamePath": "numbers", "gameTitle": "Numbers", "gameId": 2 },
  { "gamePath": "memoradd", "gameTitle": "Mem0radd", "gameId": 3 }
];

const MemoryGames = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const games = gameList.map(game => {
    return (
      <>
        <GameButton 
          key={game.gameId} 
          gamePath={game.gamePath} 
          gameTitle={game.gameTitle} 
        />
      </>
    )
  })
  
  return (
    <>
      <h2 className="opening-words">Welcome to Memory Games!</h2>
      <br />
      <h5>Please choose one of the three memory games to start playing!</h5>
      
      <div className='game-options'>
        {games}
      </div>
      <Button variant="outline-secondary" className="how-to-play" onClick={handleShow}>How to play</Button>
      
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body className="how-to-play-modal">
          <strong>Matching Cards</strong>
          <p>Flip over two cards at a time and get them to match. Try to get all the pairs to match with the fewest turns possible!</p>
          <strong>Numbers</strong>
          <p>Memorize the placement of the cards. Once they are face down, try to flip the cards in the correct order starting from 1 all the way to 9. Be careful flipping the X cards!</p>
          <strong>Mem0radd</strong>
          <p>The purpose of the game is to try to score as many points as possible. Try to remember the placement of the cards, and start the game by flipping over a card with number 1 on it. From there, you can either flip over a card of the same number OR a card with a number that is one greater than the previous card.</p> 
          <p>Example flipping sequence: Card number 1 - Card number 1 - Card number 2 - Card number 3 - ... Card number 9, and finally Card number 0.</p>
          <p>Lose one life when you flip over a card that does not follow the numerical pattern. However, the game ends when you flip over the number 0 card at any point in the game!</p>
          <p>Note: There's a way to get bonus points. Try to find it!</p>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default MemoryGames;