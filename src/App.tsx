import React from "react";
import "./App.css";

import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Registration } from "./components/resgistration";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Main />
      <Registration />
    </>
  );
};

export default App;
