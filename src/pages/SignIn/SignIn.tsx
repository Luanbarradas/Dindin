import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInValidationSchema } from "../validation/userValidation";
import { SignInData } from "../../interfaces/index";

import "../../App.css";
import styles from "./SignIn.module.css";
import { EntryHeader } from "../../components/EntryHeader";

export const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: yupResolver(signInValidationSchema),
  });

  const onSubmit: SubmitHandler<SignInData> = (data) => {
    console.log(data);
  };
  return (
    <>
      <div className="bg_entry">
        <EntryHeader />
        <div className={styles.container_login}>
          <div className={styles.presentation_login}>
            <h1>
              Controle suas <span>finanças</span>, sem planilha chata.
            </h1>
            <p>
              Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você
              tem tudo num único lugar e em um clique de distância.
            </p>
            <button className="default_button">Cadastre-se</button>
          </div>
          <form className={styles.form_style} onSubmit={handleSubmit(onSubmit)}>
            <h2 className="form_title">Login</h2>
            <label htmlFor="">E-mail</label>
            <input type="email" {...register("email")} />
            <p className="erros_form">{errors?.email?.message}</p>

            <label htmlFor="">Senha</label>
            <input type="password" {...register("password")} />
            <p className="erros_form">{errors?.password?.message}</p>

            <button type="submit" className="default_button signUp_button">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
