import React from "react";
import styles from "./Organizational.module.css";

export const OrganizationalCRUD: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.form_container}>
                <h3>Registrar Transação</h3>
                <form>
                    <label htmlFor="date">Data</label>
                    <input type="date" id="date" required />

                    <label htmlFor="day">Dia da Semana</label>
                    <input type="text" id="day" placeholder="Dia da Semana" required />

                    <label htmlFor="description">Descrição</label>
                    <input type="text" id="description" placeholder="Descrição" required />

                    <label htmlFor="category">Categoria</label>
                    <input type="text" id="category" placeholder="Categoria" required />

                    <label htmlFor="value">Valor</label>
                    <input type="number" id="value" placeholder="Valor" required />

                    <button type="submit">Adicionar Registro</button>
                </form>
            </div>

            <div className={styles.summary_container}>
                <h3>Resumo</h3>
                <table className={styles.summary_table}>
                    <tbody>
                        <tr>
                            <td>Entradas:</td>
                            <td>R$ 0,00</td>
                        </tr>
                        <tr>
                            <td>Saídas:</td>
                            <td>R$ 0,00</td>
                        </tr>
                        <tr>
                            <td>Saldo:</td>
                            <td>R$ 0,00</td>
                        </tr>
                    </tbody>
                </table>
                <button className={styles.add_button}>Adicionar Registro</button>
            </div>
        </div>
    );
};
