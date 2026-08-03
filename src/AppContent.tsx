import WelcomePage from "./pages/welcomePage/WelcomePage";
import "./genericStyle.css";
import { Route, Routes } from "react-router-dom";
import MyNavbar from "./components/componentiGenerali/MyNavbar";
import MyFooter from "./components/componentiGenerali/MyFooter";
import RegisterForm from "./pages/registerPage/RegisterForm";
import LoginPage from "./pages/LoginPage/LoginPage";

const AppContent = function () {
  return (
    <div className="d-flex flex-column min-vh-100 sfondo">
      <nav className="position-fixed w-100">
        <MyNavbar />
      </nav>
      <main className="flex-grow-1 main">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
      <footer>
        <MyFooter />
      </footer>
    </div>
  );
};

export default AppContent;
