import { useState, useEffect } from "react";

import { ResumeTableProps } from "../../interfaces/transaction";

import styles from "./Resume.module.css";
import "../../Global.css";

export const Resume = ({ transacao }: ResumeTableProps) => {
  const [entrada, setEntrada] = useState<number>(0);
  const [saida, setSaida] = useState<number>(0);

  useEffect(() => {
    let totalEntrada = 0;
    let totalSaida = 0;

    transacao.forEach((item) => {
      if (item.tipo === "entrada") {
        totalEntrada += Number(item.valor);
      } else if (item.tipo === "saida") {
        totalSaida += Number(item.valor);
      }
    });

    setEntrada(Number(totalEntrada.toFixed(2)));
    setSaida(Number(totalSaida.toFixed(2)));
  }, [transacao]);

  const saldo = entrada - saida;

  return (
    <>
      <div className={`${styles.resume_container} ${styles.shadow}`}>
        <h2>Resumo</h2>
        <div className={styles.item}>
          <span className={styles.item_label}>Entrada</span>
          <span className={styles.value_income}>R$ {entrada.toFixed(2)}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.item_label}>Saída</span>
          <span className={styles.value_expenses}>R$ {saida.toFixed(2)}</span>
        </div>
        <hr />
        <div className={styles.item}>
          <span className={styles.item_label}>Saldo</span>
          <span
            className={styles.value_balance}
            style={{
              color:
                saldo < 0
                  ? "var(--DEBT_ORANGE)"
                  : "var(--REGISTRATION_AREA_BLUE)",
            }}
          >
            R$ {saldo.toFixed(2)}
          </span>
        </div>
      </div>
    </>
  );
};
