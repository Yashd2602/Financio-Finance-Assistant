import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Components/Homepage";
import Layout from "./Components/Layout";
import Overview from "./Components/Overview";
import Transactions from "./Components/Transactions";
import Insights from "./Components/Insights";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="insights" element={<Insights />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
