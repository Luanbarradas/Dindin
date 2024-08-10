import React, { useEffect, useState } from "react";
import axios from "axios";
import { NumericFormat } from "react-number-format";

import "../../Global.css";

import { getItem } from "../../services/api";
import { AddRegisterModalProps, ICategory } from "../../interfaces/index";

export const AddRegisterModal: React.FC<AddRegisterModalProps> = ({
  show,
  onClose,
  onNewTransaction,
}) => {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState<ICategory[]>([]);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"entrada" | "saida">("entrada");
  const [selectedCategory, setSelectedCategory] = useState("");

  const token = getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://desafio-backend-03-dindin.pedagogico.cubos.academy/categoria",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategory(response.data);
        if (response.data.length > 0) {
          setSelectedCategory(response.data[0].descricao);
        }
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategories();
  }, [token]);

  useEffect(() => {
    setType("entrada");
  }, [show]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const categoriaId = category.find(
      (option) => option.descricao === selectedCategory
    )?.id;
    const newRegister = {
      tipo: type,
      valor: Number(value),
      categoria_id: categoriaId,
      data: date,
      descricao: description,
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
        setType("entrada");
        setSelectedCategory(category[0].descricao);
        setDate("");
        setValue("");
        setDescription("");
        onNewTransaction();
      }
      onClose();
    } catch (error) {
      console.error("Erro ao adicionar registro:", error);
    }
  };

  const handleTipoClick = (tipo: "entrada" | "saida") => {
    setType(tipo);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal_content">
        <div className="modal_container_title">
          <h2 className="modal_title">Adicionar Registro</h2>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>

        <div className="transaction_type">
          <button
            className="default_button btn_modal_type"
            style={{
              backgroundColor:
                type === "entrada"
                  ? "var(--REGISTRATION_AREA_BLUE)"
                  : "var(--INPUT_GRAY)",
            }}
            onClick={() => handleTipoClick("entrada")}
          >
            Entrada
          </button>
          <button
            className="default_button btn_modal_type"
            style={{
              backgroundColor:
                type === "saida"
                  ? "var(--REGISTRATION_AREA_RED)"
                  : "var(--INPUT_GRAY)",
            }}
            onClick={() => handleTipoClick("saida")}
          >
            Saída
          </button>
        </div>
        <form className="container_group" onSubmit={handleSubmit}>
          <div className={"form_group"}>
            <label>Valor</label>
            <NumericFormat
              value={value}
              onValueChange={(values) => {
                const { value } = values;
                setValue(value);
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
          <div className={"form_group"}>
            <label>Categoria</label>
            <select
              className="select_style"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {category.map((option) => (
                <option key={option.id} value={option.descricao}>
                  {option.descricao}
                </option>
              ))}
            </select>
          </div>
          <div className={"form_group"}>
            <label>Data</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className={"form_group"}>
            <label>Descrição</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button className="default_button modal_button" type="submit">
            Confirmar
          </button>
        </form>
      </div>
    </div>
  );
};
