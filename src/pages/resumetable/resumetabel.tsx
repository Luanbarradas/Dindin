import { useState, useEffect } from "react";
import styles from "./resumetabel.module.css";
import { ResumeTableProps } from "../../interfaces/transaction";

export const ResumeTable = ({ transacao }: ResumeTableProps) => {
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
    <div className={styles.resume}>
      <div className={styles.container_txt_h2_resume}>
        <h2>Resumo</h2>
      </div>
      <table className={styles.table_resume}>
        <tbody>
          <tr className={styles.table_resume}>
            <th scope="row" className={styles.entrace_txt}>
              Entradas
            </th>
            <td className={styles.entrace}>R$ {entrada.toFixed(2)}</td>
          </tr>
          <tr>
            <th scope="row" className={styles.exit_txt}>
              Saídas
            </th>
            <td className={styles.exit}>R$ {saida.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <hr />
      <table className={styles.table_resume}>
        <tbody>
          <tr>
            <th scope="row" className={styles.balance_txt}>
              Saldo
            </th>
            <td className={styles.balance}>R$ {saldo.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
