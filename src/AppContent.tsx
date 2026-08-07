import "./genericStyle.css";
import { Route, Routes } from "react-router-dom";
import RegisterForm from "./pages/registerPage/RegisterForm";
import LoginPage from "./pages/LoginPage/LoginPage";
import UserLayout from "./pages/visitor_pages/userLayout/UserLayout";
import { ProtectedRoute } from "./configurazione/ProtectedRoute";
import UserHome from "./pages/visitor_pages/userHome/UserHome";
import ProfilePage from "./pages/visitor_pages/profilePage/ProfilePage";
import AttrazioniPage from "./pages/visitor_pages/attrazioniPage/AttrazioniPage";

const AppContent = function () {
  return (
    <main className="flex-grow-1 main">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterForm />} />
        // ROUTE PER VISITORS
        <Route
          element={
            <ProtectedRoute requiredRole="VISITOR">
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/visitor/home" element={<UserHome />} />
          <Route path="/visitor/profile" element={<ProfilePage />} />
          <Route path="/visitor/attrazioni" element={<AttrazioniPage />} />
        </Route>
      </Routes>
    </main>
  );
};

export default AppContent;
