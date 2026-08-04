import WelcomePage from "./pages/welcomePage/WelcomePage";
import "./genericStyle.css";
import { Route, Routes } from "react-router-dom";
import RegisterForm from "./pages/registerPage/RegisterForm";
<<<<<<< Updated upstream
import LoginPage from "./pages/LoginPage/LoginPage";

const AppContent = function () {
  return (
    <main className="flex-grow-1 main">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </main>
  );
};

export default AppContent;
