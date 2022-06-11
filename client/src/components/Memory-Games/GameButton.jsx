import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./GameButton.scss"

const GameButton = (props) => {
  const { gamePath, gameTitle } = props;
  
  return (
    <div className="game-options">
      <Link to={`/memory-games/${gamePath}`} className="link">
        <Button variant="danger" className="memoradd-game-buttons">
          {gameTitle}
        </Button>
      </Link>
    </div>
  )
}

export default GameButton;