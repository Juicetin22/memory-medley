import React, { useState } from "react";
import "./index.scss";
import { Button } from "react-bootstrap";

const images = [];

for (let i = 1; i <= 31; i++) {
  images.push({id: i, src: `/images/image-${i}.png`});
}

const MemorageGame = () => {
  
  const [currentImage, setCurrentImage] = useState(images[0].src);

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

  return (
    <>
      <div className="image-holder">
        <img src={currentImage} />
      </div>
      <br />
      <Button onClick={next}>RANDOMIZE</Button>
    </>
  )
}

export default MemorageGame;