import React, { useState } from "react";
import "./index.scss";
import { Button } from "react-bootstrap";

const images = [];

for (let i = 1; i <= 31; i++) {
  images.push({id: i, src: `/images/image-${i}.png`});
}

const MemorageGame = () => {
  
  const [currentImage, setCurrentImage] = useState(images[0].src);
  const [log, setLog] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [shake, setShake] = useState(false);
    
  const animate = () => {
    // set shake state to true when incorrect answer  
    setShake(true);
    // stop shaking after a period of time
    setTimeout(() => setShake(false), 500);
      
  }

  // function to generate a random number between 1 and the number of images
  const random = () => {
    return Math.floor(Math.random() * (images[images.length - 1].id - images[0].id + 1)) + images[0].id;
  }

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
      next();
    } else {
      setLives(prev => prev - 1);
      setLog(prev => [...prev, currentImage]);
      animate();
      next();
    }
  }

  const checkNew = () => {
    if (log.indexOf(currentImage) === -1) {
      setLog(prev => [...prev, currentImage]);
      setScore(prev => prev + 1);
      next();
    } else {
      setLives(prev => prev - 1);
      animate();
      next();
    }
  }

  return (
    <>
      <div className="image-holder">
        <img src={currentImage} />
      </div>
      <br />
      <div className="memorage-buttons">
        <Button onClick={checkSeen}>Seen</Button>
        <Button onClick={checkNew}>New</Button>
      </div>
      <br />
      <p>Score: {score}</p>
      <p className={shake ? "shake" : null}>Lives: {lives}</p>
    </>
  )
}

export default MemorageGame;