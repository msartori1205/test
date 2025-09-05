import "./App.css";
import Map from "./Map";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Map />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
