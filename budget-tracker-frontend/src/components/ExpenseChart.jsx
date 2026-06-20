import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF"
];

function ExpenseChart({ transactions }) {

  const expenseData = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((acc, transaction) => {

      const existing = acc.find(
        item => item.name === transaction.category
      );

      if (existing) {
        existing.value += Number(transaction.amount);
      } else {
        acc.push({
          name: transaction.category,
          value: Number(transaction.amount)
        });
      }

      return acc;
    }, []);

  return (
    <div className="chart-container">

      <h2>Expense Distribution</h2>

      <PieChart width={500} height={300}>
        <Pie
          data={expenseData}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        >
          {expenseData.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />

      </PieChart>

    </div>
  );
}

export default ExpenseChart;