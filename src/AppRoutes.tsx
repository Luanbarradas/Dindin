import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import { SignIn } from "./pages/SignIn/SignIn";
import { SignUp } from "./pages/SignUp/SignUp";
// import { Tabela } from "./pages/Organizational/Organizational";
import { Home } from "./pages/Home/Home";
import { Header } from "./components/Header/Header";

export const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        {/* Rotas privadas */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
        </Route>
        {/* Rota para 404 */}
        <Route path="*" element={<h1>Página não encontrada (404)</h1>} />
      </Routes>
    </Router>
  );
};

function ProtectedRoutes() {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/signin" />;
}

// export const AppRoutes = () => {
//   return (
//     <Router>
//       <Header />
//       <>
//         <Routes>
//           <Route path="/" element={<SignUp />} />
//           <Route path="/signin" element={<SignIn />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/resume" element={<Resume />} />
//           <Route path="*" element={<h1>Página não encontrada (404)</h1>} />
//         </Routes>
//       </>
//     </Router>
//   );
// };
