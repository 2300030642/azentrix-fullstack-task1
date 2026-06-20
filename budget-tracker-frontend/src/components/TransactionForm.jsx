import React, { useState, useEffect } from "react";

function TransactionForm({
  onAdd,
  onUpdate,
  editingTransaction
}) {

  const [transaction, setTransaction] = useState({
    title: "",
    amount: "",
    type: "INCOME",
    category: "",
    transactionDate: ""
  });

  useEffect(() => {
    if (editingTransaction) {
      setTransaction(editingTransaction);
    }
  }, [editingTransaction]);

  const handleChange = (e) => {
    setTransaction({
      ...transaction,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingTransaction) {
      onUpdate(editingTransaction.id, transaction);
    } else {
      onAdd(transaction);
    }

    setTransaction({
      title: "",
      amount: "",
      type: "INCOME",
      category: "",
      transactionDate: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-row">

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={transaction.title}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={transaction.amount}
          onChange={handleChange}
          required
        />

        <select
          name="type"
          value={transaction.type}
          onChange={handleChange}
        >
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </select>

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={transaction.category}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="transactionDate"
          value={transaction.transactionDate}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingTransaction
            ? "Update Transaction"
            : "Add Transaction"}
        </button>

      </div>
    </form>
  );
}

export default TransactionForm;