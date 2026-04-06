import SummaryCards from "./SummaryCards";
import Transactions from "./Transactions";
import Insights from "./Insights";
import RoleSwitcher from "./RoleSwitcher";
import AddTransaction from "./AddTransactions";

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Finance Dashboard</h1>

      <RoleSwitcher />
      <SummaryCards />
      <AddTransaction />
      <Transactions />
      <Insights />
    </div>
  );
}

export default Dashboard;