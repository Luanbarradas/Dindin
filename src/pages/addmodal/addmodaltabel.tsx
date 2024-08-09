import React, { useEffect, useState } from "react";
import axios from "axios";
import { NumericFormat } from "react-number-format";

import styles from "./addmodaltabel.module.css";
import "../../Global.css";

import { getItem } from "../../services/api";
import {
  AddRegisterModalProps,
  ICategoria,
} from "../../interfaces/transaction";

export const AddRegisterModal: React.FC<AddRegisterModalProps> = ({
  show,
  onClose,
  onNewTransaction,
}) => {
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState<ICategoria[]>([]);
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState<"entrada" | "saida">("entrada");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  const token = getItem("token");

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get(
          "https://desafio-backend-03-dindin.pedagogico.cubos.academy/categoria",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategoria(response.data);
        if (response.data.length > 0) {
          setCategoriaSelecionada(response.data[0].descricao);
        }
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategorias();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const categoriaId = categoria.find(
      (option) => option.descricao === categoriaSelecionada
    )?.id;
    const newRegister = {
      tipo,
      valor: Number(valor),
      categoria_id: categoriaId,
      data,
      descricao,
    };

    try {
      const response = await axios.post(
        "https://desafio-backend-03-dindin.pedagogico.cubos.academy/transacao",
        newRegister,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setTipo("entrada");
        setCategoriaSelecionada(categoria[0].descricao);
        setData("");
        setValor("");
        setDescricao("");
        onNewTransaction();
      }
      onClose();
    } catch (error) {
      console.error("Erro ao adicionar registro:", error);
    }
  };

  const handleTipoClick = (tipo: "entrada" | "saida") => {
    setTipo(tipo);
  };

  if (!show) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <h2 className={styles.modal_content_h2}>Adicionar Registro</h2>
        <div className={styles.transaction_type}>
          <button
            style={{
              backgroundColor:
                tipo === "entrada"
                  ? "var(--REGISTRATION_AREA_BLUE)"
                  : "var(--INPUT_GRAY)",
            }}
            onClick={() => handleTipoClick("entrada")}
          >
            Entrada
          </button>
          <button
            style={{
              backgroundColor:
                tipo === "saida"
                  ? "var(--REGISTRATION_AREA_RED)"
                  : "var(--INPUT_GRAY)",
            }}
            onClick={() => handleTipoClick("saida")}
          >
            Saída
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.form_group}>
            <label>Valor</label>
            <NumericFormat
              value={valor}
              onValueChange={(values) => {
                const { value } = values;
                setValor(value);
              }}
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              decimalScale={2}
              fixedDecimalScale
              allowNegative={false}
              className="input"
              required
            />
          </div>
          <div className={styles.form_group}>
            <label>Categoria</label>
            <select
              value={categoriaSelecionada}
              onChange={(e) => setCategoriaSelecionada(e.target.value)}
            >
              {categoria.map((option) => (
                <option key={option.id} value={option.descricao}>
                  {option.descricao}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.form_group}>
            <label>Data</label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label>Descrição</label>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </div>
          <button className="default_button" type="submit">
            Confirmar
          </button>
        </form>
      </div>
    </div>
  );
};
