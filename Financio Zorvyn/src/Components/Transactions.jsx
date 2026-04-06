import { useSelector, useDispatch } from "react-redux";
import { setSearch , deleteTransaction } from "../Redux/transactionSlice.js";
import AddTransaction from "./AddTransactions";
import { useState } from "react";

function Transactions() {
    const [typeFilter, setTypeFilter] = useState("all");
const [categoryFilter, setCategoryFilter] = useState("all");
  const categories = [
  "all",
  "Food & Dining",
  "Transportation",
  "Entertainment",
  "Healthcare",
  "Shopping",
  "Utilities",
  "Salary",
  "Freelance",
  "Investment",
  "Education",
  "Travel",
  "Other"
];
  const dispatch = useDispatch();
  const { transactions, search } = useSelector(s => s.transactions);

const filtered = transactions.filter(t => {
  const matchSearch =
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.amount.toString().includes(search); // 🔥 FIXED number search

  const matchType =
    typeFilter === "all" || t.type === typeFilter;

  const matchCategory =
    categoryFilter === "all" || t.category === categoryFilter;

  return matchSearch && matchType && matchCategory;
});


  const exportCSV = () => {
  const csv = transactions.map(t =>
    `${t.title},${t.amount},${t.category},${t.date}`
  ).join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "transactions.csv";
  a.click();
};

  return (
    <div>
      <h2>Transactions</h2>
      <input
        placeholder="Search transactions..."
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
      <button onClick={exportCSV}>Export CSV</button>

      <AddTransaction />
      <input
  placeholder="Search..."
  value={search}
  onChange={(e) => dispatch(setSearch(e.target.value))}
/>

<select onChange={(e) => setTypeFilter(e.target.value)}>
  <option value="all">All Types</option>
  <option value="income">Income</option>
  <option value="expense">Expense</option>
</select>

<select onChange={(e) => setCategoryFilter(e.target.value)}>
  {categories.map(c => <option key={c} value={c}>{c}</option>)}
</select>

  {!filtered.length && <div className="empty">No transactions found</div>}

      {filtered.map(t => (
        
<div className="transaction" key={t.id}>
  
  <div className="tx-left">
    <p className="tx-title">{t.title}</p>
    <span className="tx-category">{t.category}</span>
  </div>

  <div className="tx-right">
    <p className="tx-amount">₹{t.amount}</p>
    <span className={t.type}>
      {t.type === "income" ? "↑ Income" : "↓ Expense"}
    </span>

    <button
      className="delete-btn"
      onClick={() => dispatch(deleteTransaction(t.id))}
    >
      ✕
    </button>
  </div>

</div>
      ))}
    </div>
  );
}

export default Transactions;