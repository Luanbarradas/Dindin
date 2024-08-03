import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInValidationSchema } from "../../services/userValidation";
import { SignInData } from "../../interfaces/index";

import "../../Global.css";
import styles from "./SignIn.module.css";
import { EntryHeader } from "../../components/Header/HeaderEntry/HeaderEntry";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: yupResolver(signInValidationSchema),
  });

  const onSubmit: SubmitHandler<SignInData> = async (inputsValue) => {
    try {
      const { data } = await api.post("/usuarios", {
        email: inputsValue.email,
        senha: inputsValue.password,
      });

      if (data) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.usuarios));
        navigate("/");
      }
    } catch (error) {
      alert("Ocorreu um erro");
    }
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
