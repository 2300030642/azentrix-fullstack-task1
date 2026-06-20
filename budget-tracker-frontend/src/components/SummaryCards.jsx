import React from "react";

function SummaryCards({ summary }) {
  return (
    <div className="summary-container">
      <div className="card">
        <h3>Total Income</h3>
        <p>₹{summary.totalIncome}</p>
      </div>

      <div className="card">
        <h3>Total Expense</h3>
        <p>₹{summary.totalExpense}</p>
      </div>

      <div className="card">
        <h3>Balance</h3>
        <p>₹{summary.balance}</p>
      </div>
    </div>
  );
}

export default SummaryCards;