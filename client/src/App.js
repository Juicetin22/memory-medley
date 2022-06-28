import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import MemoryGames from "./components/Memory-Games";
import Matching from "./components/Memory-Games/Matching";
import NumbersMemory from "./components/Memory-Games/NumbersMemory";
import Memoradd from "./components/Memory-Games/Memoradd";
import TapGame from "./components/Tap-Game";
import Classic from "./components/Tap-Game/Classic";
import Number from "./components/Tap-Game/Number";
import Memorage from "./components/Memorage";
import MemorageGame from "./components/Memorage/Game";

function App() {
  return (
    <div className="App">
       <Routes>
        <Route path={"/"} element={<Homepage />} />
        <Route path={"/memory-games"} element={<MemoryGames />} />
        <Route path={"/memory-games/matching-cards"} element={<Matching />} />
        <Route path={"/memory-games/numbers"} element={<NumbersMemory />} />
        <Route path={"/memory-games/memoradd"} element={<Memoradd />} />
        <Route path={"/tap-game"} element={<TapGame />} />
        <Route path={"/tap-game/classic"} element={<Classic />} />
        <Route path={"/tap-game/number"} element={<Number />} />
        <Route path={"/memorage"} element={<Memorage />} />
        <Route path={"/memorage/game-start"} element={<MemorageGame />} />
      </Routes>
    </div>
  );
}

export default App;
