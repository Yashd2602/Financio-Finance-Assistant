import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Overview from "./Components/Overview";
import Transactions from "./Components/Transactions";
import Insights from "./Components/Insights";
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="insights" element={<Insights />} />
        </Route>

        <Route path="*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
