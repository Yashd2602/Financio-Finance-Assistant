import { createSlice } from "@reduxjs/toolkit";

const saved = localStorage.getItem("transactions");

const initialState = {
  transactions: saved ? JSON.parse(saved) : [],
  role: "admin",
  search: ""
};

const slice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    deleteTransaction: (state, action) => {
  state.transactions = state.transactions.filter(t => t.id !== action.payload);
  localStorage.setItem("transactions", JSON.stringify(state.transactions));
},
    addTransaction: (state, action) => {
  state.transactions.push(action.payload);
  localStorage.setItem("transactions", JSON.stringify(state.transactions));
},
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    }
  }
});

export const { addTransaction, setRole, setSearch, deleteTransaction } = slice.actions;
export default slice.reducer;