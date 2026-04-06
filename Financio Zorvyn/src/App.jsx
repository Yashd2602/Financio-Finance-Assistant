import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./Components/Layout";
import Overview from "./Components/Overview";
import Transactions from "./Components/Transactions";
import Insights from "./Components/Insights";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

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
