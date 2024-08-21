import React from "react";

import exitIcon from "../../assets/exit-icon.svg";
import styles from "./Logout.module.css";

export const Logout: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/signin";
  };

  return (
    <button className={styles.logout_button} onClick={handleLogout}>
      <img src={exitIcon} alt="Sair" />
    </button>
  );
};
