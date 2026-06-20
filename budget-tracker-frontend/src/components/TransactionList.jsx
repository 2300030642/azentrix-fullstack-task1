import React from "react";

function TransactionList({
  transactions,
  onDelete,
  onEdit
}) {

  return (
    <div className="table-container">
      <table>

        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Category</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>₹{Number(t.amount).toLocaleString()}</td>
              <td>{t.type}</td>
              <td>{t.category}</td>
              <td>{t.transactionDate}</td>

              <td>

                <button
                  className="edit-btn"
                  onClick={() => onEdit(t)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => onDelete(t.id)}
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>
    </div>
  );
}

export default TransactionList;