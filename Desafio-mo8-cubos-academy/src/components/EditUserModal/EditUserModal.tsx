import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "./EditUserModal.module.css";

import { getItem } from "../../services/api";
import { EditUserModalProps } from "../../interfaces/index";

const EditUserModal: React.FC<EditUserModalProps> = ({
  show,
  onClose,
  onNameUpdate,
}) => {
  const token = getItem("token");
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(
          "https://desafio-backend-03-dindin.pedagogico.cubos.academy/usuario",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFormData((prevState) => ({
          ...prevState,
          nome: data.nome,
          email: data.email,
        }));
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const { data } = await axios.put(
        "https://desafio-backend-03-dindin.pedagogico.cubos.academy/usuario",
        { nome: formData.nome, email: formData.email, senha: formData.senha },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Usuário atualizado:", data);
      onNameUpdate(formData.nome);
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  if (!show) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <h2>Editar Perfil</h2>
        <form onSubmit={handleSubmit} className={styles.edit_user_form}>
          <div className={styles.form_group}>
            <label>Nome</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label>Senha</label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label>Confirme a Senha</label>
            <input
              type="password"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={styles.edit_user_button}>
            Confirmar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
