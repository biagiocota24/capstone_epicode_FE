import WelcomePage from "./pages/welcomePage/WelcomePage";
import "./genericStyle.css";
import { Route, Routes } from "react-router-dom";
import RegisterForm from "./pages/registerPage/RegisterForm";
<<<<<<< Updated upstream
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
=======
// import LoginForm from "./pages/LoginPage/LoginForm";
import LoginForm2 from "./pages/LoginPage/LoginForm2";

const AppContent = function () {
  return (
    <main>
      <Routes>
        // ROUTE PUBBLICHE
        <Route path="/" element={<WelcomePage />} />
        {/* <Route path="/login" element={<LoginForm />} /> */}
        <Route path="/login" element={<LoginForm2 />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </main>
>>>>>>> Stashed changes
  );
};

export default AppContent;
