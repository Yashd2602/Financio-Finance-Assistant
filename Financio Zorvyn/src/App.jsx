import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Components/Layout";
import Overview from "./Components/Overview";
import Transactions from "./Components/Transactions";
import Insights from "./Components/Insights";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="insights" element={<Insights />} />
        </Route>

        <Route path="/dashboard" element={<Navigate to="/" replace />} />
        <Route path="/dashboard/transactions" element={<Navigate to="/transactions" replace />} />
        <Route path="/dashboard/insights" element={<Navigate to="/insights" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
