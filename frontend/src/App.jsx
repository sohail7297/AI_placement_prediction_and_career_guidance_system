import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Predictor from "./pages/Predictor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predictor" element={<Predictor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;