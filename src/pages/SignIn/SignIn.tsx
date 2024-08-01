import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInValidationSchema } from "../validation/userValidation";
import "../../App.css";
import styles from "./SignIn.module.css";

export const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInValidationSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };
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
        <input type="email" {...register("email")} />
        <p>{errors?.email?.message}</p>

        <label htmlFor="">Senha</label>
        <input type="password" {...register("password")} />
        <p>{errors?.password?.message}</p>

        <button
          className="default_button signUp_button"
          onClick={() => handleSubmit(onSubmit)()}
        >
          Entrar
        </button>
      </form>
    </div>
  );
};
