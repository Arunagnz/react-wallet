import React, { useEffect, useContext } from "react";
import { Transaction } from "./Transaction";
import { TransactionContext } from "../context/TransactionContext";

export const TransactionList = () => {
  const { transactions, getTransactions } = useContext(TransactionContext);

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <h3>History</h3>
      <ul className="list">
        {transactions &&
          transactions.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))}
      </ul>
    </React.Fragment>
  );
};
