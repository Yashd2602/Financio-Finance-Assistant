import { useSelector } from "react-redux";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, BarChart, Bar
} from "recharts";

function SummaryCards() {
  const transactions = useSelector(s => s.transactions.transactions);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // 🔥 DAILY (CURRENT MONTH)
  const dailyMap = {};
  transactions.forEach(t => {
    const d = new Date(t.date);
    if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
      const day = d.getDate();

      if (!dailyMap[day]) dailyMap[day] = { income: 0, expense: 0 };

      if (t.type === "income") dailyMap[day].income += t.amount;
      else dailyMap[day].expense += t.amount;
    }
  });

  const dailyData = Object.keys(dailyMap).map(day => ({
    day,
    ...dailyMap[day]
  }));

  // 🔥 MONTHLY (CURRENT YEAR)
  const monthMap = {};
  transactions.forEach(t => {
    const d = new Date(t.date);
    if (d.getFullYear() === currentYear) {
      const m = d.getMonth();

      if (!monthMap[m]) monthMap[m] = { income: 0, expense: 0 };

      if (t.type === "income") monthMap[m].income += t.amount;
      else monthMap[m].expense += t.amount;
    }
  });

  const monthlyData = Object.keys(monthMap).map(m => ({
    month: `M${+m + 1}`,
    ...monthMap[m]
  }));

  // 🔥 YEARLY (ALL TIME)
  const yearMap = {};
  transactions.forEach(t => {
    const y = new Date(t.date).getFullYear();

    if (!yearMap[y]) yearMap[y] = { income: 0, expense: 0 };

    if (t.type === "income") yearMap[y].income += t.amount;
    else yearMap[y].expense += t.amount;
  });

  const yearlyData = Object.keys(yearMap).map(y => ({
    year: y,
    ...yearMap[y]
  }));

  return (
    <div className="charts-grid">

      {/* DAILY */}
      <div className="card">
        <h3>Daily (This Month)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={dailyData}>
            <XAxis dataKey="day"/>
            <YAxis/>
            <Tooltip/>
            <Line dataKey="income" stroke="#4ade80"/>
            <Line dataKey="expense" stroke="#f87171"/>
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* MONTHLY */}
      <div className="card">
        <h3>Monthly (This Year)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyData}>
            <XAxis dataKey="month"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="income" fill="#4ade80"/>
            <Bar dataKey="expense" fill="#f87171"/>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* YEARLY */}
      <div className="card">
        <h3>Yearly (All Time)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={yearlyData}>
            <XAxis dataKey="year"/>
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

export default SummaryCards;