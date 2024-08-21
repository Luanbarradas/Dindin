import React from "react";
import { useLocation } from "react-router-dom";

import userIcon from "../../assets/account_user_person_profile_avatar_icon.svg";
import logo from "../../assets/logo.svg";

import styles from "./Header.module.css";
import { Logout } from "../Logout/Logout";

export const Header: React.FC = () => {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/signin" || location.pathname === "/signup";

  const user = localStorage.getItem("user");
  const userName = user ? JSON.parse(user).nome : "";

  return (
    <header className={styles.bg_header}>
      <div className={styles.container_logo}>
        <img src={logo} alt="Logo" />
        <p className={styles.logo_name}>Dindin</p>
      </div>
      {!isAuthPage && (
        <div className={styles.icons_header}>
          <img
            className={styles.spacing_items}
            src={userIcon}
            alt="Ícone do usuário"
          />
          <p className={styles.spacing_items}>{userName}</p>
          <Logout />
        </div>
      )}
    </header>
  );
};
