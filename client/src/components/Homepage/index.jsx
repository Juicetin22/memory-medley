import "./index.scss";
import { Button } from 'react-bootstrap'

const Homepage = () => {
  return(
    <>
      <h2 className="opening-words">Welcome to Tap Games!</h2>
      <p>Tap on either button below to start playing!</p>
      
      <div className="game-buttons">
        <Button className="classic-button">Classic Tap Game</Button>
        <Button variant="danger" className="number-button">Number Tap Game</Button>
      </div>
      <Button variant="outline-secondary" className="how-to-play">How to play</Button>
    </>
  )
}

export default Homepage;