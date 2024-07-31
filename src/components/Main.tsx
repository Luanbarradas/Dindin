import React from "react";

import { SignUp } from "./SignUp";

import styles from "./Main.module.css";

export const Main: React.FC = () => {
  return (
    <main className={styles.bg_main}>
      <SignUp />
    </main>
  );
};
