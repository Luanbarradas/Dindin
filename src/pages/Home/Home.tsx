import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Global.css";
import "./style.css";
import { FilterButton } from "../../components/filterbutton/buttonFilter";
import { Header } from "../../components/Header/Header";
import { ResumeTable } from "../Organizational/resumetabel";
import { Tabela } from "../Organizational/tabel";
import { getItem } from "../../services/api";
import { Transacao } from "../../interfaces/Transaction";
import { AddRegisterModal } from "../Organizational/addmodaltabel";
import { EditRegisterModal } from "../Organizational/modaltabela";
import axios from "axios";

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
      setTransacao(response.data);
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
    <div className="background">
      <Header />
      <main className="main-home">
        <div className="container-description">
          <FilterButton />
          <div className="description">
            <Tabela
              transacao={transacao}
              setTransacao={setTransacao}
              setCurrentRegister={setCurrentRegister}
              setEditRegister={setEditRegister}
            />
            <div className="container-resume">
              <ResumeTable transacao={transacao} />
              <button onClick={() => setAddRegister(true)}>
                Adicionar Registro
              </button>
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
