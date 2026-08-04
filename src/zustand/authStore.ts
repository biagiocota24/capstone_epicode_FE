import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Admin,
  BusinessOwner,
  CredenzialiLogin,
  LoginResponse,
  Visitor,
} from "../interfaces/intefaces";

interface AuthStore {
  user: Visitor | Admin | BusinessOwner | null;
  token: string | null;
  isAuthenticated: boolean;

  login: (credenziali: CredenzialiLogin) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (credenziali: CredenzialiLogin) => {
        try {
          const response = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credenziali),
          });

          const accessData: LoginResponse = await response.json();
          console.log(accessData);

          if (response.ok) {
            set({
              user: accessData.currentUser,
              token: `${accessData.type} ${accessData.token}`,
              isAuthenticated: true,
            });
            return true;
          } else {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
            });
            return false;
          }
        } catch (error) {
          console.error("Errore login:", error);
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
          return false; // ← Ritorna false se errore di rete
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
