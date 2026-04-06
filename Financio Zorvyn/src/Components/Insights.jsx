import { useSelector } from "react-redux";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, ComposedChart, Bar, Line,
  PieChart, Pie, Cell, Legend
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
          <AreaChart data={data}>
            <XAxis dataKey="month"/>
            <YAxis/>
            <Tooltip/>
            <Area type="monotone" dataKey="expense" stroke="#f87171" fill="#f8717133"/>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* SAVINGS */}
      <div className="card">
        <h3>Savings Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <ComposedChart data={data}>
            <XAxis dataKey="month"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="savings" fill="#60a5fa33" radius={[6,6,0,0]}/>
            <Line type="monotone" dataKey="savings" stroke="#60a5fa" dot={false}/>
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* COMBINED */}
      <div className="card">
        <h3>Income vs Expense</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={[
                { name: 'Income', value: data.reduce((s, d) => s + d.income, 0) },
                { name: 'Expense', value: data.reduce((s, d) => s + d.expense, 0) }
              ]}
              cx="50%" cy="50%"
              innerRadius={60} outerRadius={100}
              dataKey="value"
              label
            >
              <Cell fill="#4ade80"/>
              <Cell fill="#f87171"/>
            </Pie>
            <Legend/>
            <Tooltip/>
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default Insights;