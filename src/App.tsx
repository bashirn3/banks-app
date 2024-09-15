import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Banks from "../src/features/banks/banks";
import Bank from "../src/features/banks/bank";

function App() {
  return (
    <Router>
      <div className="h-screen bg-[#B4B4B4] py-5">
        <Routes>
          <Route path="/" element={<Banks />} />
          <Route path="/bank/:id" element={<Bank />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;