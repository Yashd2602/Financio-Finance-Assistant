import { useSelector } from "react-redux";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, BarChart, Bar
} from "recharts";

function Insights() {
  const transactions = useSelector(s => s.transactions.transactions);

  const monthly = {};

  transactions.forEach(t => {
    const d = new Date(t.date);
    const key = `${d.getFullYear()}-${d.getMonth()+1}`;

    if (!monthly[key]) monthly[key] = { income: 0, expense: 0 };

    if (t.type === "income") monthly[key].income += t.amount;
    else monthly[key].expense += t.amount;
  });

  const data = Object.keys(monthly).map(k => ({
    month: k,
    income: monthly[k].income,
    expense: monthly[k].expense,
    savings: monthly[k].income - monthly[k].expense
  }));

  return (
    <div className="charts-grid">

      {/* EXPENSE */}
      <div className="card">
        <h3>Expenses Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis dataKey="month"/>
            <YAxis/>
            <Tooltip/>
            <Line dataKey="expense" stroke="#f87171"/>
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* SAVINGS */}
      <div className="card">
        <h3>Savings Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis dataKey="month"/>
            <YAxis/>
            <Tooltip/>
            <Line dataKey="savings" stroke="#60a5fa"/>
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* COMBINED */}
      <div className="card">
        <h3>Income vs Expense</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="month"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="income" fill="#4ade80"/>
            <Bar dataKey="expense" fill="#f87171"/>
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default Insights;