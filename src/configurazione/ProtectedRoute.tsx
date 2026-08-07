import { Navigate } from "react-router-dom";
import { useAuthStore } from "../zustand/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "VISITOR" | "ADMIN" | "BUSINESSOWNER";
}

export const ProtectedRoute = ({
  children,
  requiredRole,
}: ProtectedRouteProps) => {
  const { isAuthenticated, role } = useAuthStore();

  // ❌ Non autenticato → vai a login
  if (!isAuthenticated) {
    console.log("❌ Non autenticato, reindirizza a /login");
    return <Navigate to="/" replace />;
  }

  // ❌ Ruolo non corretto → vai a unauthorized
  if (requiredRole && role !== requiredRole) {
    console.log(
      `❌ Ruolo non autorizzato. Richiesto: ${requiredRole}, Hai: ${role}`,
    );
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Tutto ok → renderizza il contenuto
  console.log(`✅ Accesso consentito per ruolo: ${role}`);
  return <>{children}</>;
};
