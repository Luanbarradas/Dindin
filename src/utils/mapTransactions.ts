// import {
//   ExtractTransaction,
//   ExtratoApi,
//   Transacao,
//   Transaction,
// } from "../interfaces";

// export const mapToTransaction = (apiTransaction: Transacao): Transaction => {
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

// export const mapToTransacao = (transaction: Transaction): Transacao => {
//   return {
//     id: transaction.id,
//     tipo: transaction.type,
//     descricao: transaction.description,
//     valor: transaction.value,
//     data: transaction.date,
//     usuario_id: transaction.user_id,
//     categoria_id: transaction.category_id,
//     categoria_nome: transaction.category_name,
//   };
// };

// export const mapToExtractTransaction = (
//   apiExtract: ExtratoApi
// ): ExtractTransaction => {
//   return {
//     income: apiExtract.entrada,
//     expenses: apiExtract.saida,
//   };
// };
