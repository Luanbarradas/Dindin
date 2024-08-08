import React from "react";
import { useTransactionsSummary } from "../../hooks/useTransactionsSummary";
import styles from "./Resume.module.css";

const Resume: React.FC = () => {
  const extract = useTransactionsSummary();

  const income = extract?.income || 0;
  const expenses = extract?.expenses || 0;

  const balance = income - expenses;

  return (
    <>
      <div className={styles.resume_container_main}>
        <div className={`${styles.resume_container} ${styles.shadow}`}>
          <h2>Resumo</h2>
          <div className={styles.item}>
            <span className={styles.item_label}>Entrada</span>
            <span className={styles.value_income}>{income.toFixed(2)}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.item_label}>Saída</span>
            <span className={styles.value_expenses}>{expenses.toFixed(2)}</span>
          </div>
          <hr />
          <div className={styles.item}>
            <span className={styles.item_label}>Saldo</span>
            <span className={styles.value_balance}>{balance.toFixed(2)}</span>
          </div>
        </div>
        <button className="default_button">Adicionar Registro</button>
      </div>
    </>
  );
};

export default Resume;
