import React, { useEffect, useState } from "react";
import "./index.scss";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import classNames from "classnames";

const images = [];

for (let i = 1; i <= 31; i++) {
  images.push({id: i, src: `/images/image-${i}.png`});
}

const MemorageGame = () => {
  
  const [currentImage, setCurrentImage] = useState("");
  const [log, setLog] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  
  const [shake, setShake] = useState(false);

  const incorrect = () => {
    // set shake state to true when incorrect answer  
    setShake(true);
    // stop shaking after a period of time
    setTimeout(() => setShake(false), 500);
      
  }

  const [bounce, setBounce] = useState(false);

  const correct = () => {
    // set bounce state to true when correct answer  
    setBounce(true);
    // stop bouncing after a period of time
    setTimeout(() => setBounce(false), 600);
      
  }

  const status = classNames({ "shake": shake }, { "full": lives === 3}, { "moderate": lives === 2}, { "low": lives < 2 });

  // function to generate a random number between 1 and the number of images
  const random = () => {
    return Math.floor(Math.random() * (images[images.length - 1].id - images[0].id + 1)) + images[0].id;
  }

  // generate next image
  const next = () => {
    const generate = random();

    for (const image of images) {
      if (image.id === generate) {
        setCurrentImage(image.src);
      };
    };
  }

  const checkSeen = () => {
    if (log.indexOf(currentImage) !== -1) {
      setScore(prev => prev + 1);
      correct();
      next();
    } else {
      setLives(prev => prev - 1);
      setLog(prev => [...prev, currentImage]);
      incorrect();
      next();
    }
  }

  const checkNew = () => {
    if (log.indexOf(currentImage) === -1) {
      setLog(prev => [...prev, currentImage]);
      setScore(prev => prev + 1);
      correct();
      next();
    } else {
      setLives(prev => prev - 1);
      incorrect();
      next();
    }
  }

  // generate one of the images in list randomly at the start of the game
  useEffect(() => {
    next();
  }, [])

  return (
    <>
      <div className="memorage-top-buttons">
        <Link to={"/memorage"}>
          <button className="memorage-back">← Back</button>
        </Link>
        <Button className="memorage-new-game">New Game</Button>
      </div>
      <h3 className="memorage-header">Memorage</h3>
      <div className="image-holder">
        <img src={currentImage} />
      </div>
      <br />
      <div className="memorage-buttons">
        <Button onClick={checkSeen} disabled={!lives}>Seen</Button>
        <Button onClick={checkNew} disabled={!lives}>New</Button>
      </div>
      <br />
      <p className={bounce ? "bounce" : null}>Score: {score}</p>
      <p className={status}>Lives: {lives}</p>
    </>
  )
}

export default MemorageGame;