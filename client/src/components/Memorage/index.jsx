import React from "react";
import "./index.scss";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Memorage = () => {
  return (
    <>
      <h2 className="memorage-title">Welcome to Memorage!</h2>
      <br />
      <h5>Instructions: Determine whether the image in front of you is a new image or one that has already been shown.</h5>
      <br />
      <p>Try to aim for a high score!</p>
      
      <Link to={"/memorage/game-start"}>
        <Button className="memorage-start-button">Click to begin</Button>
      </Link>

      <div className="back-container">
        <Link to="/" className="link">
          <button className="back-to-main">← Back to Main Menu</button>
        </Link>
      </div>

      <p className="image-shoutout">All images in this game were drawn by <a href="https://www.instagram.com/juicetinsketchs/">@juicetinsketchs</a></p>
    </>
  )
}

export default Memorage;