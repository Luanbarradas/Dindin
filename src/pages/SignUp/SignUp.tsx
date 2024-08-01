import React from "react";

import "../../App.css";
import styles from "./SignUp.module.css";

export const SignUp: React.FC = () => {
  return (
    <form className={styles.form_style} action="">
      <h1 className="form_title">Cadastre-se</h1>

      <label htmlFor="name">Nome</label>
      <input type="text" id="name" required />

      <label htmlFor="email">E-mail</label>
      <input type="email" id="email" required />

      <label htmlFor="password">Senha</label>
      <input type="password" id="password" required />

      <label htmlFor="confirm_password">Confirmação de senha</label>
      <input type="password" id="confirm_password" required />

      <button className="default_button">Cadastrar</button>

      <a className={styles.link_singIn} href="#">
        Já tem cadastro? Clique aqui!
      </a>
    </form>
  );
};
