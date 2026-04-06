import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../Redux/transactionSlice.js";
import { useState } from "react";

const categories = [
  "🍔 Food & Dining",
  "🚗 Transportation",
  "🎬 Entertainment",
  "💊 Healthcare",
  "🛍️ Shopping",
  "💡 Utilities",
  "💰 Salary",
  "💻 Freelance",
  "📈 Investment",
  "📚 Education",
  "✈️ Travel",
  "📦 Other"
];

function AddTransaction() {
  const role = useSelector(s => s.transactions.role);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "Food",
    date: ""
  });

  if (role !== "admin") return null;

  const handleAdd = () => {
    const dateObj = new Date(form.date);
const year = dateObj.getFullYear();

if (!form.date) {
  setError("Date is required");
  return;
}

if (year < 2000 || year > new Date().getFullYear()) {
  setError("Invalid year");
  return;
}

if (dateObj > new Date()) {
  setError("Future date not allowed");
  return;
}
    if (new Date(form.date) > new Date()) {
      setError("Future date not allowed");
      return;
    }

    dispatch(addTransaction({
      ...form,
      id: Date.now(),
      amount: Number(form.amount)
    }));

    setOpen(false);
    setError("");
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>+ Add Transaction</button>

      {open && (
        <div className="modal">
          <div className="modal-content">

            <h3>Add Transaction</h3>

            {error && <p className="error">{error}</p>}

            <input placeholder="Title"
              onChange={e => setForm({...form, title: e.target.value})}/>

            <input type="number" placeholder="Amount"
              onChange={e => setForm({...form, amount: e.target.value})}/>

            {/* TYPE BUTTONS */}
            <div className="type-buttons">
  <button
    className={form.type === "expense" ? "active-expense" : ""}
    onClick={() => setForm({...form, type: "expense"})}
  >
    Expense
  </button>

  <button
    className={form.type === "income" ? "active-income" : ""}
    onClick={() => setForm({...form, type: "income"})}
  >
    Income
  </button>
</div>

           <select
  value={form.category}
  onChange={(e) => setForm({ ...form, category: e.target.value })}
  className="category-select"
>
  {categories.map(c => (
    <option key={c} value={c}>{c}</option>
  ))}
</select>

            <input type="date"
              onChange={e => setForm({...form, date: e.target.value})}/>

            <button className="ac" onClick={handleAdd}>Add</button>
            <button className="ca" onClick={() => setOpen(false)}>Cancel</button>

          </div>
        </div>
      )}
    </>
  );
}

export default AddTransaction;