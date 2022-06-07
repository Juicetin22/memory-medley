import React from "react";
import "./index.scss";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <>
      <Card className="home-card">
        <Card.Body>
          <h2 className="title">Welcome to Memory Medley!</h2>
          <p>Please choose one of the following game modes to begin ☺️</p>
          <div className="game-modes">
            <Link to={"/memory-games"}>
              <Button >Memory Games</Button>
            </Link>
            <div className="game-modes-bottom">
              <Link to={"/tap-game"}>
                <Button >Tap Game</Button>
              </Link>
              <Link to={"/memorage"}>
                <Button >Memorage</Button>
              </Link>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

export default Homepage;