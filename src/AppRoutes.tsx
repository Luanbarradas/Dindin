import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import { Home } from "./pages/Home/Home";
import { SignIn } from "./pages/SignIn/SignIn";
import { SignUp } from "./pages/SignUp/SignUp";
import { Tabela } from "./pages/Organizational/Organizational";
import { Home } from "./pages/Home/Home";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </Router>
  );
};
