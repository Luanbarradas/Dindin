import {
  ExtractTransaction,
  Transacao,
  Transaction,
  UpdateTransactionData,
} from "../interfaces/index";
import { mapToTransacao, mapToTransaction } from "../utils/mapTransactions";
import { api, ENDPOINTS } from "./api";

// Função para buscar transações
// export const fetchTransactions = async () => {
//   try {
//     const response = await api.get(ENDPOINTS.transaction);
//     console.log(response);
//     return response.data;
//   } catch (error) {
//     console.error("Failed to fetch transactions", error);
//     throw error;
//   }
// };

// // Função para adicionar uma transação
// export const addTransaction = async (
//   transaction: Omit<Transaction, "id" | "user_id" | "category_name">
// ) => {
//   try {
//     await api.post(ENDPOINTS.transaction, transaction);
//     return fetchTransactions(); // opcional
//   } catch (error) {
//     console.error("Failed to add transaction", error);
//     throw error;
//   }
// };

// // Função para atualizar uma transação
// export const updateTransaction = async (
//   id: number,
//   updatedTransaction: Omit<Transaction, "id" | "user_id" | "category_name">
// ) => {
//   try {
//     await api.put(`${ENDPOINTS.transaction}/${id}`, updatedTransaction);
//     return fetchTransactions(); // opcional
//   } catch (error) {
//     console.error("Failed to update transaction", error);
//     throw error;
//   }
// };

// // Função para excluir uma transação
// export const deleteTransaction = async (id: number) => {
//   try {
//     await api.delete(`${ENDPOINTS.transaction}/${id}`);
//     return fetchTransactions(); // opcional
//   } catch (error) {
//     console.error("Failed to delete transaction", error);
//     throw error;
//   }
// };

// // Função pra obter o extrato
// export const fetchExtract = async (): Promise<ExtractTransaction> => {
//   try {
//     const response = await api.get("/transacao/extrato");
//     const { entrada, saida } = response.data as {
//       entrada: number;
//       saida: number;
//     };

//     const extrato: ExtractTransaction = {
//       income: entrada,
//       expenses: saida,
//     };

//     return extrato;
//   } catch (error) {
//     console.error("Failed to fetch extract", error);
//     throw error;
//   }
// };

// const mapToTransaction = (apiTransaction: ApiTransaction): Transaction => {
//   return {
//     id: apiTransaction.id,
//     type: apiTransaction.tipo,
//     description: apiTransaction.descricao,
//     value: apiTransaction.valor,
//     date: apiTransaction.data,
//     user_id: apiTransaction.usuario_id,
//     category_id: apiTransaction.categoria_id,
//     category_name: apiTransaction.categoria_nome,
//   };
// };

// const fetchTransactions = async (): Promise<Transaction[]> => {
//   try {
//     const response = await api.get<ApiTransaction[]>("/transacoes");
//     return response.data.map(mapToTransaction);
//   } catch (error) {
//     console.error("Failed to fetch transactions", error);
//     throw error;
//   }
// };

// Função para adicionar uma transação
// export const addTransaction = async (
//   transaction: Omit<Transaction, "id" | "user_id" | "category_name">
// ) => {
//   try {
//     await api.post(ENDPOINTS.transaction, transaction);
//     return fetchTransactions(); // opcional
//   } catch (error) {
//     console.error("Failed to add transaction", error);
//     throw error;
//   }
// };

const fetchTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await api.get<Transacao[]>("/transacoes");
    return response.data.map(mapToTransaction);
  } catch (error) {
    console.error("Failed to fetch transactions", error);
    throw error;
  }
};

// Função para atualizar uma transação
export const updateTransaction = async (
  id: number,
  updatedTransaction: UpdateTransactionData
) => {
  try {
    await api.put(`${ENDPOINTS.transaction}/${id}`, updatedTransaction);
  } catch (error) {
    console.error("Failed to update transaction", error);
    throw error;
  }
};

// Função para excluir uma transação
export const deleteTransaction = async (id: number) => {
  try {
    await api.delete(`${ENDPOINTS.transaction}/${id}`);
    return fetchTransactions();
  } catch (error) {
    console.error("Failed to delete transaction", error);
    throw error;
  }
};

// Função pra obter o extrato
export const fetchExtract = async (): Promise<ExtractTransaction> => {
  try {
    const response = await api.get("/transacao/extrato");
    const { entrada, saida } = response.data as {
      entrada: number;
      saida: number;
    };

    const extrato: ExtractTransaction = {
      income: entrada,
      expenses: saida,
    };

    return extrato;
  } catch (error) {
    console.error("Failed to fetch extract", error);
    throw error;
  }
};

export const addTransaction = async (
  transaction: Omit<Transaction, "id" | "user_id" | "category_name">
) => {
  try {
    const apiTransaction = mapToTransacao(transaction);
    await api.post(ENDPOINTS.transaction, apiTransaction);
    return fetchTransactions();
  } catch (error) {
    console.error("Failed to add transaction", error);
    throw error;
  }
};
