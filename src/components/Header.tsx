import React from "react";

import logo from "../assets/logo.svg";
import userIcon from "../assets/account_user_person_profile_avatar_icon.svg";
import exitIcon from "../assets/exit-icon.svg";

import styles from "./Header.module.css";

export const Header: React.FC = () => {
  return (
    <header className={styles.bg_header}>
      <img src={logo} alt="Logo" />
      <div className={styles.icons_header}>
        <img src={userIcon} alt="Icone do usuário" />
        <p>Fulano</p>
        <img src={exitIcon} alt="Sair" />
      </div>
    </header>
  );
};
