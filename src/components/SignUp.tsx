import React from "react";

import "../App.css";
import styles from "./SignUp.module.css";

export const SignUp: React.FC = () => {
  return (
    <form className={styles.form_style} action="">
      <h1 className="form_title">Cadastre-se</h1>
      <label htmlFor="">Nome</label>
      <input type="text" />

      <label htmlFor="">E-mail</label>
      <input type="email" />

      <label htmlFor="">Senha</label>
      <input type="password" />

      <label htmlFor="">Confirmação de senha</label>
      <input type="password" />

      <button className="default_button">Cadastrar</button>

      <a className={styles.link_singIn} href="#">
        Já tem cadastro? Clique aqui!
      </a>
    </form>
  );
};
