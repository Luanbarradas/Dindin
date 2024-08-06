import { useState, useEffect } from "react";
import { fetchTransactions } from "../services/apiService";

const useTransactionsSummary = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchTransactions();
        setIncome(data.entrada);
        setExpenses(data.saida);
      } catch (error) {
        console.error("Failed to fetch transactions", error);
      }
    };

    loadTransactions();
  }, []);

  return { income, expenses };
};

export default useTransactionsSummary;
