import React from "react";

import "../../App.css";
import styles from "./SignIn.module.css";

export const SignIn: React.FC = () => {
  return (
    <div className={styles.container_login}>
      <div className={styles.presentation_login}>
        <h1>
          Controle suas <span>finanças</span>, sem planilha chata.
        </h1>
        <p>
          Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem
          tudo num único lugar e em um clique de distância.
        </p>
        <button className="default_button">Cadastre-se</button>
      </div>
      <form className={styles.form_style} action="">
        <h2 className="form_title">Login</h2>
        <label htmlFor="">E-mail</label>
        <input type="email" />

        <label htmlFor="">Senha</label>
        <input type="password" />

        <button className="default_button signUp_button">Entrar</button>
      </form>
    </div>
  );
};
