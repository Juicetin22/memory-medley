import React, { useState } from "react";
import "./index.scss";

const images = [
  { id: 1, src: "/images/image-1.png" }
];

const MemorageGame = () => {
  
  const [image, setImage] = useState({});

  const random = () => {

  }

  return (
    <>
      <div className="image-holder">
        <img src={images[0].src} />
      </div>
    </>
  )
}

export default MemorageGame;