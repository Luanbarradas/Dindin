import React, { useState } from "react";
import styles from "./Home.module.css";
import Modal from "../../components/Modal/Modal";

export const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <main className={styles.bg_home}>
        <div>{/* <Table /> */}</div>

        <div>
          <div className={styles.resume}>
            <h1>Resumo</h1>
          </div>
          <button onClick={openModal}>Adicionar Registro</button>
        </div>
      </main>

      {/* <Modal /> */}
    </>
  );
};
