import { useState, useEffect } from "react";

import { ResumeScheduleProps } from "../../interfaces/index";

import styles from "./Resume.module.css";
import "../../Global.css";

export const Resume = ({ transaction }: ResumeScheduleProps) => {
  const [income, setIncome] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);

  useEffect(() => {
    let totalIncome = 0;
    let totalExpense = 0;

    transaction.forEach((item) => {
      if (item.tipo === "entrada") {
        totalIncome += Number(item.valor);
      } else if (item.tipo === "saida") {
        totalExpense += Number(item.valor);
      }
    });

    setIncome(Number(totalIncome.toFixed(2)));
    setExpense(Number(totalExpense.toFixed(2)));
  }, [transaction]);

  const balance = income - expense;

  return (
    <>
      <div className={`${styles.resume_container} ${styles.shadow}`}>
        <h2>Resumo</h2>
        <div className={styles.item}>
          <span className={styles.item_label}>Entrada</span>
          <span className={styles.value_income}>R$ {income.toFixed(2)}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.item_label}>Saída</span>
          <span className={styles.value_expenses}>R$ {expense.toFixed(2)}</span>
        </div>
        <hr />
        <div className={styles.item}>
          <span className={styles.item_label}>Saldo</span>
          <span
            className={styles.value_balance}
            style={{
              color:
                balance < 0
                  ? "var(--DEBT_ORANGE)"
                  : "var(--REGISTRATION_AREA_BLUE)",
            }}
          >
            R$ {balance.toFixed(2)}
          </span>
        </div>
      </div>
    </>
  );
};
