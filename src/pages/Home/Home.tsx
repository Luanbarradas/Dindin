import React from "react";

import { SignUp } from "../SignUp/SignUp";

import styles from "./Home.module.css";

export const Home: React.FC = () => {
  return (
    <main className={styles.bg_home}>
      <SignUp />
    </main>
  );
};
