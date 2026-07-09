import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Predictor from "./pages/Predictor";
import Resume from "./pages/Resume";
import Interview from "./pages/Interview";
import Analytics from "./pages/Analytics";
import Results from "./pages/Results";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/predictor" element={<Predictor />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/interview" element={<Interview />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  );
}

export default App;