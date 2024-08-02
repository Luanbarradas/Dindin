import React from "react";

import logo from "../assets/logo.svg";
import userIcon from "../assets/account_user_person_profile_avatar_icon.svg";
import exitIcon from "../assets/exit-icon.svg";

import styles from "./HomeHeader.module.css";

export const HomeHeader: React.FC = () => {
  return (
    <header className="bg_header">
      <div className={styles.container_logo}>
        <img src={logo} alt="Logo" />
        <p className="logo_name">Dindin</p>
      </div>
      <div className={styles.icons_header}>
        <img src={userIcon} alt="Icone do usuário" />
        <p>Fulano</p>
        <img src={exitIcon} alt="Sair" />
      </div>
    </header>
  );
};
