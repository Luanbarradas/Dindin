// pages/Home/Home.tsx

import React, { useState } from "react";
import styles from "./Home.module.css";
import Modal from "../../components/Modal/Modal";
import Table from "../../components/Table/Table";
import useTransactions from "../../hooks/userTransactions";
import Resume from "../../components/Resume/Resume";

export const Home: React.FC = () => {
  const { transactions, remove } = useTransactions();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id: number) => {
    try {
      await remove(id);
    } catch (error) {
      console.error("Failed to delete transaction", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <main className={styles.bg_home}>
        <div>
          <Table
            transactions={transactions}
            onEdit={(id) => console.log("Edit", id)} // Placeholder for edit action
            onDelete={handleDelete}
          />
        </div>

        <div>
          <Resume />
        </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Add Transaction">
        {/* Formulário para adicionar/editar transações aqui */}
      </Modal>
    </>
  );
};
