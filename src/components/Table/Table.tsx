import React from "react";
import { Transaction } from "../../interfaces/index";
import editIcon from "../../assets/editIcon.svg";
import deleteIcon from "../../assets/deleteIcon.svg";

import styles from "./Table.module.css";

interface TableProps {
  transactions: Transaction[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const Table: React.FC<TableProps> = ({ transactions, onEdit, onDelete }) => {
  return (
    <table className={styles.table_container}>
      <thead>
        <tr className={styles.table_header}>
          <th className={styles.table_itens}>Date</th>
          <th className={styles.table_itens}>Description</th>
          <th className={styles.table_itens}>Category</th>
          <th className={styles.table_itens}>Value</th>
          <th className={styles.table_itens}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr className={styles.table_header} key={transaction.id}>
            <td className={styles.table_itens}>{transaction.date}</td>
            <td className={styles.table_itens}>{transaction.description}</td>
            <td className={styles.table_itens}>{transaction.category_name}</td>
            <td className={styles.table_itens}>
              {transaction.value.toFixed(2)}
            </td>
            <td className={styles.table_itens}>
              <button onClick={() => onEdit(transaction.id)}>
                <img src={editIcon} alt="Edit" />
              </button>
              <button onClick={() => onDelete(transaction.id)}>
                <img src={deleteIcon} alt="Delete" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
