import React, { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TransactionContext } from "../context/TransactionContext";

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(TransactionContext);
  const notify = (message) => toast.dark(message);

  const handleDelete = async (event) => {
    deleteTransaction(transaction.id);
    notify("Transaction deleted !!");
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <li className={transaction.amount < 0 ? "minus" : "plus"}>
        <div className="transaction-container">
          {transaction.text}
          <p className="transaction-date">
            {new Date(transaction.created_at).toLocaleDateString()}{" "}
          </p>
        </div>

        <span>$ {Math.abs(transaction.amount)}</span>
        <button className="delete-btn" onClick={handleDelete}>
          X
        </button>
      </li>
    </React.Fragment>
  );
};
