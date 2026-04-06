import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const { pathname } = useLocation();

  return (
    <div className="sidebar">
      <h2>Financio</h2>

      <Link className={pathname === "/dashboard" ? "active" : ""} to="/dashboard">
        Overview
      </Link>

      <Link className={pathname.includes("transactions") ? "active" : ""} to="/dashboard/transactions">
        Transactions
      </Link>

      <Link className={pathname.includes("insights") ? "active" : ""} to="/dashboard/insights">
        Insights
      </Link>
    </div>
  );
}

export default Sidebar;