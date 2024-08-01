import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import { Home } from "./pages/Home/Home";
import { SignIn } from "./pages/SignIn/SignIn";
import { SignUp } from "./pages/SignUp/SignUp";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
      </Routes>
    </Router>
  );
};
