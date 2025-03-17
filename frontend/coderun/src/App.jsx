import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CodeRunApp from "./components/CodeRunApp";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<CodeRunApp />} />
      </Routes>
    </Router>
  );
}

export default App;
