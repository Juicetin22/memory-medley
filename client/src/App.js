import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import TapGame from "./components/Tap-Game";
import Classic from "./components/Tap-Game/Classic";
import Number from "./components/Tap-Game/Number";
import Memorage from "./components/Memorage";

function App() {
  return (
    <div className="App">
       <Routes>
        <Route path={"/"} element={<Homepage />} />
        <Route path={"/tap-game/"} element={<TapGame />} />
        <Route path={"/tap-game/classic"} element={<Classic />} />
        <Route path={"/tap-game/number"} element={<Number />} />
        <Route path={"/memorage"} element={<Memorage />} />
      </Routes>
    </div>
  );
}

export default App;
