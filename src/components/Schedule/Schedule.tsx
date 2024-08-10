import "../../Global.css";
import styles from "./Schedule.module.css";
import pencil from "../../assets/pencil.svg";
import bin from "../../assets/bin.svg";
import triangleAsc from "../../assets/triangleAsc.svg";
import triangleDesc from "../../assets/triangleDesc.svg";
import { getItem } from "../../services/api";
import { ScheduleProps, ICategory, Transaction } from "../../interfaces/index";
import { useEffect, useState } from "react";
import { EditRegisterModal } from "../RegisterModal/EditRegisterModal";
import { Popup } from "../Popup/Popup";
import axios from "axios";

export const Schedule = ({
  transaction,
  setTransaction,
  setEditRegister,
  setCurrentRegister,
}: ScheduleProps) => {
  const token = getItem("token");
  const [currentEditRegister] = useState<Transaction | undefined>(undefined);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [showDeletePopup, setShowDeletePopup] = useState<number | null>(null);
  const [ordenation, setOrdenation] = useState("asc");

  function changeOrdenation() {
    const newOrdenation = ordenation === "asc" ? "desc" : "asc";

    const sortedTransactions = [...transaction].sort((a, b) => {
      const dateA = new Date(a.data);
      const dateB = new Date(b.data);
      return newOrdenation === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });

    setTransaction(sortedTransactions);
    setOrdenation(newOrdenation);
  }

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

  const getCategoryDescription = (categoriaId: number) => {
    const category = categories.find((cat) => Number(cat.id) === categoriaId);
    return category ? category.descricao : "Desconhecida";
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

  const handleDeleteTransaction = async (id: number) => {
    try {
      await axios.delete(
        `https://desafio-backend-03-dindin.pedagogico.cubos.academy/transacao/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransaction(transaction.filter((transacao) => transacao.id !== id));
    } catch (error) {
      console.error("Erro ao excluir transação:", error);
    }
  };

  const handleEditRegister = (id: number) => {
    const register = transaction.find((transacao) => transacao.id === id);
    if (register) {
      setCurrentRegister(register);
      setEditRegister(true);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        "https://desafio-backend-03-dindin.pedagogico.cubos.academy/transacao",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransaction(response.data);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    }
  };

  return (
    <div className={styles.schedule_container}>
      <table>
        <thead>
          <tr className={styles.schedule_header}>
            <th className={styles.align_triangle} onClick={changeOrdenation}>
              Data
              <img
                src={triangleAsc}
                alt="Ícone ordenar por data ascendente"
                style={{ display: ordenation === "asc" ? "inline" : "none" }}
              />
              <img
                src={triangleDesc}
                alt="Ícone ordenar por data descendente"
                style={{ display: ordenation === "desc" ? "inline" : "none" }}
              />
            </th>
            <th className={styles.schedule_itens}>Dia da Semana</th>
            <th className={styles.schedule_itens}>Descrição</th>
            <th className={styles.schedule_itens}>Categoria</th>
            <th className={styles.schedule_itens}>Valor</th>
            <th className={styles.schedule_itens}></th>
          </tr>
        </thead>
        <tbody>
          {transaction.map((transacao) => (
            <tr key={transacao.id}>
              <td
                className={`${styles.schedule_itens} ${styles.border_botton_itens}`}
              >
                <p className={styles.data_item}>{handleData(transacao.data)}</p>
              </td>
              <td
                className={`${styles.schedule_itens} ${styles.border_botton_itens}`}
              >
                <p>{handleGetDay(transacao.data)}</p>
              </td>
              <td
                className={`${styles.schedule_itens} ${styles.border_botton_itens}`}
              >
                <p className={styles.container_description}>
                  {transacao.descricao}
                </p>
              </td>
              <td
                className={`${styles.schedule_itens} ${styles.border_botton_itens}`}
              >
                <p>{getCategoryDescription(transacao.categoria_id)}</p>
              </td>
              <td
                className={`${styles.border_botton_itens} ${styles.schedule_itens}`}
                style={{
                  color:
                    transacao.tipo === "saida"
                      ? "var(--DEBT_ORANGE)"
                      : "var(--SECONDARY_BLUE)",
                }}
              >
                <p>R$ {transacao.valor}</p>
              </td>
              <td
                className={`${styles.border_botton_itens} ${styles.schedule_itens}`}
              >
                <img
                  src={pencil}
                  alt="Edit icon"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEditRegister(transacao.id)}
                />
                <img
                  src={bin}
                  alt="Delete icon"
                  style={{ marginLeft: "13px", cursor: "pointer" }}
                  onClick={() => setShowDeletePopup(transacao.id)}
                />
                {showDeletePopup === transacao.id && (
                  <Popup
                    onConfirm={() => {
                      handleDeleteTransaction(transacao.id);
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
            fetchTransactions();
          }}
          currentRegister={currentEditRegister}
        />
      )}
    </div>
  );
};
