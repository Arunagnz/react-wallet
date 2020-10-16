import React from "react";
import { Header } from "./components/Header";
import { Balance } from "./components/Balance";
import { IncomeExpense } from "./components/IncomeExpense";
import { AddTransaction } from "./components/AddTransaction";
import { TransactionList } from "./components/TransactionList";
import { TransactionProvider } from "./context/TransactionContext";
import "./App.css";
import "./style/main.scss";

function App() {
  return (
    <TransactionProvider>
      <div className="row">
        <div className="sidebar">
          <Header />
          <Balance />
          <IncomeExpense />
          <AddTransaction />
        </div>
        <div className="content">
          <TransactionList />
        </div>
      </div>
    </TransactionProvider>
  );
}

export default App;
