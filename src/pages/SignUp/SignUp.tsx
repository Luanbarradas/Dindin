import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpValidationSchema } from "../../validation/userValidation";
import { SignUpData } from "../../interfaces/index";

import "../../Global.css";
import styles from "./SignUp.module.css";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

export const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: yupResolver(signUpValidationSchema),
  });

  const onSubmit: SubmitHandler<SignUpData> = async (inputsValue) => {
    try {
      const { data } = await api.post("/usuario", {
        nome: inputsValue.name,
        email: inputsValue.email,
        senha: inputsValue.password,
      });

      if (data) {
        alert("Cadastrado com sucesso");
        navigate("/signin");
      }
    } catch (error) {
      alert("Usuário já cadastrado");
    }
  };

  return (
    <>
      <form className={styles.form_style} onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form_title">Cadastre-se</h1>

        <label htmlFor="name">Nome</label>
        <input type="text" id="name" {...register("name")} />
        <p className="erros_form">{errors?.name?.message}</p>

        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" {...register("email")} />
        <p className="erros_form">{errors?.email?.message}</p>

        <label htmlFor="password">Senha</label>
        <input type="password" id="password" {...register("password")} />
        <p className="erros_form">{errors?.password?.message}</p>

        <label htmlFor="confirm_password">Confirmação de senha</label>
        <input
          type="password"
          id="confirmPassword"
          required
          {...register("confirmPassword")}
        />
        <p className="erros_form">{errors?.confirmPassword?.message}</p>

        <button
          type="submit"
          className="default_button"
          onClick={() => handleSubmit(onSubmit)()}
        >
          Cadastrar
        </button>

        <a className={styles.link_singIn} href="/signin">
          Já tem cadastro? Clique aqui!
        </a>
      </form>
    </>
  );
};
