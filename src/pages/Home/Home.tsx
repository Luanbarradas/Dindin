import React from "react";

import { SignUp } from "../SignUp/SignUp";
// import { SignIn } from "../SignIn/SignIn";

import styles from "./Home.module.css";
import { HomeHeader } from "../../components/HomeHeader";

export const Home: React.FC = () => {
  return (
    <main className={styles.bg_home}>
      <HomeHeader />
    </main>
  );
};
