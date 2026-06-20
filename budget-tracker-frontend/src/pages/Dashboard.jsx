import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import SummaryCards from "../components/SummaryCards";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import ExpenseChart from "../components/ExpenseChart";

import {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getSummary,
} from "../services/transactionService";

function Dashboard() {

  const [transactions, setTransactions] = useState([]);

  const [editingTransaction, setEditingTransaction] = useState(null);

  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  const loadTransactions = async () => {
    const response = await getTransactions();
    setTransactions(response.data);
  };

  const loadSummary = async () => {
    const response = await getSummary();
    setSummary(response.data);
  };

  const handleAdd = async (transaction) => {
    await addTransaction(transaction);

    loadTransactions();
    loadSummary();
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
  };

  const handleUpdate = async (id, transaction) => {
    await updateTransaction(id, transaction);

    setEditingTransaction(null);

    loadTransactions();
    loadSummary();
  };

  const handleDelete = async (id) => {
    await deleteTransaction(id);

    loadTransactions();
    loadSummary();
  };

  useEffect(() => {
    loadTransactions();
    loadSummary();
  }, []);

  return (
    <div>

      <Navbar />

      <div style={{ padding: "20px" }}>

        <SummaryCards summary={summary} />

<br />

<TransactionForm
  onAdd={handleAdd}
  onUpdate={handleUpdate}
  editingTransaction={editingTransaction}
/>

<br />

<ExpenseChart transactions={transactions} />

<br />

{transactions.length === 0 ? (
  <h3>No Transactions Found</h3>
) : (
  <TransactionList
    transactions={transactions}
    onDelete={handleDelete}
    onEdit={handleEdit}
  />
)}

      </div>

    </div>
  );
}

export default Dashboard;