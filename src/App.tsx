import React from "react";
import "./App.css";

import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";

const App: React.FC = () => {
  return (
    <>
      <Header />
      {/* <Main /> */}
      {/* <SignUp /> */}
      <SignIn />
    </>
  );
};

export default App;
