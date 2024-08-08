import React from "react";
import { useLocation } from "react-router-dom";

import userIcon from "../../assets/account_user_person_profile_avatar_icon.svg";
//import exitIcon from "../../assets/exit-icon.svg";
import logo from "../../assets/logo.svg";

import styles from "./Header.module.css";
import { Logout } from "../Logout/Logout";

export const Header: React.FC = () => {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <header className={styles.bg_header}>
      <div className={styles.container_logo}>
        <img src={logo} alt="Logo" />
        <p className={styles.logo_name}>Dindin</p>
      </div>
      {!isAuthPage && (
        <div className={styles.icons_header}>
          <img src={userIcon} alt="Ícone do usuário" />
          <p>Fulano</p>
          <Logout />
        </div>
      )}
    </header>
  );
};
