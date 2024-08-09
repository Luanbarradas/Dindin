import "../../Global.css";
import styles from "./tabel.module.css";
import pencil from "../../assets/pencil.svg";
import bin from "../../assets/bin.svg";
import Triangulo from "../../assets/triangulo.svg";
import { getItem } from "../../services/api";
import {
  TabelaProps,
  ICategoria,
  Transacao,
} from "../../interfaces/transaction";
import { useEffect, useState } from "react";
import { EditRegisterModal } from "../modaltable/modaltabela";
import { ConfirmDeletePopup } from "../../components/popup/popup";
import axios from "axios";

export const Tabela = ({
  transacao,
  setTransacao,
  setEditRegister,
  setCurrentRegister,
}: TabelaProps) => {
  const token = getItem("token");
  const [currentEditRegister] = useState<Transacao | undefined>(undefined);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [showDeletePopup, setShowDeletePopup] = useState<number | null>(null);
  const [ordenation, setOrdenation] = useState("asc");

  function changeOrdenation() {
    const asc = document.querySelector(".asc");
    asc?.classList.toggle("hidden");

    const desc = document.querySelector(".desc");
    desc?.classList.toggle("hidden");
    if (ordenation === "asc") {
      const transacoes = transacao.sort((a, b) => {
        const dataA = new Date(a.data);
        const dataB = new Date(b.data);
        return dataB.getTime() - dataA.getTime();
      });
      setTransacao(transacoes);
      setOrdenation("desc");
    } else {
      const transacoes = transacao.sort((a, b) => {
        const dataA = new Date(a.data);
        const dataB = new Date(b.data);
        return dataA.getTime() - dataB.getTime();
      });
      setTransacao(transacoes);
      setOrdenation("asc");
    }
  }

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
        setCategorias(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategorias();
  }, [token]);

  const getCategoriaDescricao = (categoriaId: number) => {
    const categoria = categorias.find((cat) => Number(cat.id) === categoriaId);
    return categoria ? categoria.descricao : "Desconhecida";
  };

  const handleData = (data: string) => {
    const date = new Date(data).toLocaleDateString("pt-BR", {
      timeZone: "UTC",
    });
    return date;
  };

  const handleGetDay = (data: string) => {
    const daysOfWeek = [
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
      "Domingo",
    ];
    const date = new Date(data);
    const day = date.getDay();
    return daysOfWeek[day];
  };

  const handleDeleteItem = async (id: number) => {
    try {
      await axios.delete(
        `https://desafio-backend-03-dindin.pedagogico.cubos.academy/transacao/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransacao(transacao.filter((transacao) => transacao.id !== id));
    } catch (error) {
      console.error("Erro ao excluir transação:", error);
    }
  };

  const handleEditRegister = (id: number) => {
    const registro = transacao.find((transacao) => transacao.id === id);
    if (registro) {
      setCurrentRegister(registro);
      setEditRegister(true);
    }
  };

  const fetchTransacoes = async () => {
    try {
      const response = await axios.get(
        "https://desafio-backend-03-dindin.pedagogico.cubos.academy/transacao",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransacao(response.data);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    }
  };

  return (
    <div className={styles.table_container}>
      <table>
        <thead>
          <tr className={styles.table_header}>
            <th className="data-th-txt" onClick={changeOrdenation}>
              Data
              <img
                className="asc hidden"
                src={Triangulo}
                alt="ícone reorganizar por data"
              />
              <img
                className="desc"
                src={Triangulo}
                alt="ícone reorganizar por data"
              />
            </th>
            <th className={styles.table_itens}>Dia da Semana</th>
            <th className={styles.table_itens}>Descrição</th>
            <th className={styles.table_itens}>Categoria</th>
            <th className={styles.table_itens}>Valor</th>
            <th className={styles.table_itens}></th>
          </tr>
        </thead>
        <tbody className="list-container">
          {transacao.map((transacao) => (
            <tr key={transacao.id} className="list-item">
              <td
                className={`${styles.table_itens} ${styles.border_botton_itens}`}
              >
                <p className="Data-item">{handleData(transacao.data)}</p>
              </td>
              <td
                className={`${styles.table_itens} ${styles.border_botton_itens}`}
              >
                <p>{handleGetDay(transacao.data)}</p>
              </td>
              <td
                className={`${styles.table_itens} ${styles.border_botton_itens}`}
              >
                <p className={styles.container_description}>
                  {transacao.descricao}
                </p>
              </td>
              <td
                className={`${styles.table_itens} ${styles.border_botton_itens}`}
              >
                <p>{getCategoriaDescricao(transacao.categoria_id)}</p>
              </td>
              <td
                className={styles.border_botton_itens}
                style={{
                  color:
                    transacao.tipo === "saida"
                      ? "var(--DEBT_ORANGE)"
                      : "var(--SECONDARY_BLUE)",
                }}
              >
                <p>R$ {transacao.valor}</p>
              </td>
              <td className={styles.border_botton_itens}>
                <img
                  src={pencil}
                  alt="ícone de editar"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEditRegister(transacao.id)}
                />
                <img
                  src={bin}
                  alt="ícone de deletar"
                  style={{ marginLeft: "13px", cursor: "pointer" }}
                  onClick={() => setShowDeletePopup(transacao.id)}
                />
                {showDeletePopup === transacao.id && (
                  <ConfirmDeletePopup
                    onConfirm={() => {
                      handleDeleteItem(transacao.id);
                      setShowDeletePopup(null);
                    }}
                    onCancel={() => setShowDeletePopup(null)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showEditModal && currentEditRegister && (
        <EditRegisterModal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          onUpdate={() => {
            setShowEditModal(false);
            fetchTransacoes();
          }}
          currentRegister={currentEditRegister}
        />
      )}
    </div>
  );
};
