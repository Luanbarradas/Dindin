import React, { useState, useEffect } from "react";
import axios from "axios";

import "../../Global.css";
import {
  EditCategory,
  EditRegisterModalProps,
} from "../../interfaces/transaction";
import { NumericFormat } from "react-number-format";
import { getItem } from "../../services/api";
import { NumberFormatValues } from "react-number-format";

export const EditRegisterModal: React.FC<EditRegisterModalProps> = ({
  show,
  onClose,
  onUpdate,
  currentRegister,
}) => {
  const [formData, setFormData] = useState({
    valor: "",
    categoria: "",
    data: "",
    descricao: "",
    tipo: "entrada" as "entrada" | "saida",
  });
  const [categories, setCategories] = useState<EditCategory[]>([]);
  const token = getItem("token");

  useEffect(() => {
    if (currentRegister) {
      setFormData({
        valor: currentRegister.valor.toString(),
        categoria: currentRegister.categoria_id.toString(),
        data: currentRegister.data.split("T")[0],
        descricao: currentRegister.descricao,
        tipo: currentRegister.tipo,
      });
    }
  }, [currentRegister]);

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
        setCategories(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategories();
  }, [token]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumericValueChange = (values: NumberFormatValues) => {
    const { value } = values;
    setFormData((prev) => ({ ...prev, valor: value }));
  };

  const handleTipoClick = (selectedTipo: "entrada" | "saida") => {
    setFormData((prev) => ({ ...prev, tipo: selectedTipo }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedRegister = {
      valor: parseFloat(
        formData.valor.replace(/[^0-9,.]/g, "").replace(",", ".")
      ),
      categoria_id: parseInt(formData.categoria),
      data: formData.data,
      descricao: formData.descricao,
      tipo: formData.tipo,
    };

    try {
      await axios.put(
        `https://desafio-backend-03-dindin.pedagogico.cubos.academy/transacao/${currentRegister?.id}`,
        updatedRegister,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Registro editado");
      if (typeof onUpdate === "function") {
        onUpdate();
      }
      onClose();
    } catch (error) {
      console.error("Erro ao editar registro:", error);
    }
  };

  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal_content">
        <div className="modal_container_title">
          <h2 className="modal_title">Editar Registro</h2>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>

        <div className="transaction_type">
          <button
            className="default_button btn_modal_type"
            style={{
              backgroundColor:
                formData.tipo === "entrada"
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
                formData.tipo === "saida"
                  ? "var(--REGISTRATION_AREA_RED)"
                  : "var( --INPUT_GRAY)",
            }}
            onClick={() => handleTipoClick("saida")}
          >
            Saída
          </button>
        </div>
        <form className="container_group" onSubmit={handleSubmit}>
          <div className="form_group">
            <label>Valor</label>
            <NumericFormat
              value={formData.valor}
              onValueChange={handleNumericValueChange}
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
          <div className="form_group">
            <label>Categoria</label>
            <select
              className="select_style"
              name="categoria"
              value={formData.categoria}
              onChange={handleInputChange}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.descricao}
                </option>
              ))}
            </select>
          </div>
          <div className="form_group">
            <label>Data</label>
            <input
              type="date"
              name="data"
              value={formData.data}
              onChange={handleInputChange}
            />
          </div>
          <div className="form_group">
            <label>Descrição</label>
            <input
              type="text"
              name="descricao"
              value={formData.descricao}
              onChange={handleInputChange}
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
