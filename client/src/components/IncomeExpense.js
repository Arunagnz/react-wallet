import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

export const IncomeExpense = () => {
  const { transactions } = useContext(TransactionContext);

  const amounts = transactions.map((transaction) => transaction.amount);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  return (
    <div className="inc-exp-container">
      <div className="income-container">
        <h4 className="inx-exp-heading">Income</h4>
        <h1 id="money-plus" className="money plus">
          {income}
        </h1>
      </div>
      <div className="expense-container">
        <h4 className="inx-exp-heading">Expense</h4>
        <h1 className="money minus">{expense}</h1>
      </div>
    </div>
  );
};
