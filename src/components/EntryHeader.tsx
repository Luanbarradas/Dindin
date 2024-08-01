import React from "react";

import logo from "../assets/logo.svg";

export const EntryHeader: React.FC = () => {
  return (
    <header className="bg_header container_header">
      <img src={logo} alt="Logo" />
      <p className="logo_name">Dindin</p>
    </header>
  );
};
