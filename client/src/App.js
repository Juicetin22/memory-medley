import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Classic from "./components/Classic";
import Number from "./components/Number";

function App() {
  return (
    <div className="App">
       <Routes>
        <Route path={'/'} element={<Homepage />} />
        <Route path={'/classic'} element={<Classic />} />
        <Route path={'/number'} element={<Number />} />
      </Routes>
    </div>
  );
}

export default App;
