import React, { createContext, useState, useEffect, ReactNode } from "react";
import { api, ENDPOINTS } from "../services/api";

import { TransactionsContextType, Transaction } from "../interfaces/index";

const TransactionsContext = createContext<TransactionsContextType | undefined>(
  undefined
);

const TransactionsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await api.get(ENDPOINTS.transaction);
      setTransactions(response.data);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    }
  };

  const addTransaction = async (
    transaction: Omit<Transaction, "id" | "user_id" | "category_name">
  ) => {
    try {
      await api.post(ENDPOINTS.transaction, transaction);
      fetchTransactions();
    } catch (error) {
      console.error("Failed to add transaction", error);
    }
  };

  const updateTransaction = async (
    id: number,
    updatedTransaction: Omit<Transaction, "id" | "user_id" | "category_name">
  ) => {
    try {
      await api.put(`${ENDPOINTS.transaction}/${id}`, updatedTransaction);
      fetchTransactions();
    } catch (error) {
      console.error("Failed to update transaction", error);
    }
  };

  const deleteTransaction = async (id: number) => {
    try {
      await api.delete(`${ENDPOINTS.transaction}/${id}`);
      fetchTransactions();
    } catch (error) {
      console.error("Failed to delete transaction", error);
    }
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

const useTransactions = () => {
  const context = React.useContext(TransactionsContext);
  if (context === undefined) {
    throw new Error(
      "useTransactions must be used within a TransactionsProvider"
    );
  }
  return context;
};

export { TransactionsProvider, useTransactions };
