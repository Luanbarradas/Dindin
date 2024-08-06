// // apiService.ts

// import { Transaction } from "../interfaces/index";
// import { api, ENDPOINTS } from "./api";

// // Função para buscar transações
// export const fetchTransactions = async () => {
//   try {
//     const response = await api.get(ENDPOINTS.transaction);
//     return response.data;
//   } catch (error) {
//     console.error("Failed to fetch transactions", error);
//     throw error;
//   }
// };

// // Nova função para carregar transações
// export const loadTransactions = async (): Promise<Transaction[]> => {
//   return await fetchTransactions();
// };

// // Função para adicionar uma transação
// const addTransaction = async (
//   transaction: Omit<Transaction, "id" | "user_id" | "category_name">
// ) => {
//   try {
//     await api.post(ENDPOINTS.transaction, transaction);
//     fetchTransactions();
//   } catch (error) {
//     console.error("Failed to add transaction", error);
//   }
// };

// // Função para atualizar uma transação
// const updateTransaction = async (
//   id: number,
//   updatedTransaction: Omit<Transaction, "id" | "user_id" | "category_name">
// ) => {
//   try {
//     await api.put(`${ENDPOINTS.transaction}/${id}`, updatedTransaction);
//     fetchTransactions();
//   } catch (error) {
//     console.error("Failed to update transaction", error);
//   }
// };

// // Função para excluir uma transação
// export const deleteTransaction = async (id: number) => {
//   try {
//     await api.delete(`${ENDPOINTS.transaction}/${id}`);
//     fetchTransactions();
//   } catch (error) {
//     console.error("Failed to delete transaction", error);
//   }
// };

// src/services/apiService.ts

import { Transaction } from "../interfaces/index";
import { api, ENDPOINTS } from "./api";

// Função para buscar transações
export const fetchTransactions = async () => {
  try {
    const response = await api.get(ENDPOINTS.transaction);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch transactions", error);
    throw error;
  }
};

// Função para adicionar uma transação
export const addTransaction = async (
  transaction: Omit<Transaction, "id" | "user_id" | "category_name">
) => {
  try {
    await api.post(ENDPOINTS.transaction, transaction);
    return fetchTransactions(); // opcional
  } catch (error) {
    console.error("Failed to add transaction", error);
    throw error;
  }
};

// Função para atualizar uma transação
export const updateTransaction = async (
  id: number,
  updatedTransaction: Omit<Transaction, "id" | "user_id" | "category_name">
) => {
  try {
    await api.put(`${ENDPOINTS.transaction}/${id}`, updatedTransaction);
    return fetchTransactions(); // opcional
  } catch (error) {
    console.error("Failed to update transaction", error);
    throw error;
  }
};

// Função para excluir uma transação
export const deleteTransaction = async (id: number) => {
  try {
    await api.delete(`${ENDPOINTS.transaction}/${id}`);
    return fetchTransactions(); // opcional
  } catch (error) {
    console.error("Failed to delete transaction", error);
    throw error;
  }
};
