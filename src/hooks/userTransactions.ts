import { useState, useEffect } from "react";
import { Transaction } from "../interfaces/index";
import {
  fetchTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "../services/apiService";

const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data: [] = await fetchTransactions();
        const dadosTransacao: Transaction[] = [];

        data.forEach((element: any) => {
          const transacao: Transaction = {
            id: element.id,
            type: element.tipo,
            description: element.descricao,
            value: element.valor,
            date: element.data,
            user_id: element.usuario_id,
            category_id: element.categoria_id,
            category_name: element.categoria_nome,
          };

          dadosTransacao.push(transacao);
        });

        setTransactions(dadosTransacao);
      } catch (error) {
        console.error("Failed to load transactions", error);
      }
    };

    loadTransactions();
  }, []);

  const add = async (
    newTransaction: Omit<Transaction, "id" | "user_id" | "category_name">
  ) => {
    try {
      await addTransaction(newTransaction);
      const updatedTransactions = await fetchTransactions();
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error("Failed to add transaction", error);
    }
  };

  const remove = async (id: number) => {
    try {
      await deleteTransaction(id);
      const updatedTransactions = await fetchTransactions();
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error("Failed to delete transaction", error);
    }
  };

  const update = async (
    id: number,
    updatedTransaction: Omit<Transaction, "id" | "user_id" | "category_name">
  ) => {
    try {
      await updateTransaction(id, updatedTransaction);
      const updatedTransactions = await fetchTransactions();
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error("Failed to update transaction", error);
    }
  };

  return { transactions, add, remove, update };
};

export default useTransactions;
