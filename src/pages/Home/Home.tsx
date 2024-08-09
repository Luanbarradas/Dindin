import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Global.css";
import styles from "./Home.module.css";
import { FilterButton } from "../../components/filterbutton/buttonFilter";

// import { ResumeTable } from "../resumetable/resumetabel";
import { Tabela } from "../table/tabel";
import { getItem } from "../../services/api";
import { Transacao } from "../../interfaces/transaction";
import { AddRegisterModal } from "../addmodal/addmodaltabel";
import { EditRegisterModal } from "../modaltable/modaltabela";
import axios from "axios";
import { Resume } from "../../components/Resume/Resume";

export const Home = () => {
  const [addRegister, setAddRegister] = useState<boolean>(false);
  const [editRegister, setEditRegister] = useState<boolean>(false);
  const [currentRegister, setCurrentRegister] = useState<Transacao | undefined>(
    undefined
  );
  const [transacao, setTransacao] = useState<Transacao[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    fetchTransacoes();
  }, []);

  const fetchTransacoes = async () => {
    const token = getItem("token");
    try {
      const response = await axios.get(
        "https://desafio-backend-03-dindin.pedagogico.cubos.academy/transacao",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const transacoes = response.data.sort((a: Transacao, b: Transacao) => {
        const dataA = new Date(a.data);
        const dataB = new Date(b.data);
        return dataA.getTime() - dataB.getTime();
      });

      setTransacao(transacoes);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    }
  };

  const handleNewTransaction = () => {
    fetchTransacoes();
  };

  const handleUpdateTransaction = () => {
    fetchTransacoes();
  };

  return (
    <div>
      <main className={styles.main_home}>
        <div className={styles.container_description}>
          <div className={styles.description}>
            <div className={styles.table_container}>
              <FilterButton />
              <Tabela
                transacao={transacao}
                setTransacao={setTransacao}
                setCurrentRegister={setCurrentRegister}
                setEditRegister={setEditRegister}
              />
            </div>
            <div className={styles.container_resume}>
              <div className="resume_container_main">
                <Resume transacao={transacao} />
                <button
                  className="default_button"
                  onClick={() => setAddRegister(true)}
                >
                  Adicionar Registro
                </button>
              </div>
              <AddRegisterModal
                show={addRegister}
                onClose={() => setAddRegister(false)}
                onNewTransaction={handleNewTransaction}
              />
              {editRegister && (
                <EditRegisterModal
                  show={editRegister}
                  onClose={() => setEditRegister(false)}
                  onUpdate={handleUpdateTransaction}
                  currentRegister={currentRegister}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// pages / Home / Home - Luan;

// import React, { useState } from "react";
// import styles from "./Home.module.css";
// import Modal from "../../components/Modal/Modal";
// import Table from "../../components/Table/Table";
// import useTransactions from "../../hooks/userTransactions";
// import Resume from "../../components/Resume/Resume";

// export const Home: React.FC = () => {
//   const { transactions, remove } = useTransactions();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleDelete = async (id: number) => {
//     try {
//       await remove(id);
//     } catch (error) {
//       console.error("Failed to delete transaction", error);
//     }
//   };

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   return (
//     <>
//       <main className={styles.bg_home}>
//         <div>
//           <Table
//             transactions={transactions}
//             onEdit={(id) => console.log("Edit", id)} // Placeholder for edit action
//             onDelete={handleDelete}
//           />
//         </div>

//         <div>
//           <Resume />
//         </div>
//       </main>

//       <Modal isOpen={isModalOpen} onClose={closeModal} title="Add Transaction">
//         {/* Formulário para adicionar/editar transações aqui */}
//       </Modal>
//     </>
//   );
// };
