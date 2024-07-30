import React from "react";
import styles from "./registration.module.css";

export const Registration: React.FC = () => {
    return (
        <div className={styles.form_container}>
            <h2>Cadastre-se</h2>
            <form>
                <label htmlFor="name">Nome</label>
                <input type="text" id="name" required />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" required />

                <label htmlFor="password">Senha</label>
                <input type="password" id="password" required />

                <label htmlFor="confirm_password">Confirmação de Senha</label>
                <input type="password" id="confirm_password" required />

                <button type="submit">Cadastrar</button>
            </form>
            <div className={styles.small_text}>
                Já tem cadastro? <a href="#">Clique aqui</a>
            </div>
        </div>
    );
};
