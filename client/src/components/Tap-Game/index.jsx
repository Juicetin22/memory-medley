import React, { useState } from "react";
import "./index.scss";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const TapGame = () => {
  
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return(
    <>
      <h2 className="opening-words">Welcome to Tap Games!</h2>
      <br />
      <h5>If you like to click, these games are right for you!</h5>
      <p>Tap on either button below to start playing!</p>
      
      <div className="game-buttons">
        <Link to={"/tap-game/classic"}>
          <Button className="classic-button">Classic Tap Game</Button>
        </Link>
        <Link to={"/tap-game/number"}>
          <Button variant="danger" className="number-button">Number Tap Game</Button>
        </Link>
      </div>
      <Button variant="outline-secondary" className="how-to-play" onClick={handleShow}>How to play</Button>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body className="how-to-play-modal">
          <strong>Classic Tap Game</strong>
          <p>Tap the shape on the screen to earn a point. Try to earn as many points as you can within the time limit!</p>
          <strong>Number Tap Game</strong>
          <p>Starting from the number 1, tap the correct number to earn a point. But be careful, as the game goes on, there will be other numbers to confuse you! Try to earn as many points as you can within the time limit!</p>
        </Modal.Body>
      </Modal>

      <div className="back-container">
        <Link to="/" className="link">
          <button className="back-to-main">← Back to Main Menu</button>
        </Link>
      </div>
    </>
  )
}

export default TapGame;