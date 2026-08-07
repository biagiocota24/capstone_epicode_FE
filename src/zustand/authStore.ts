import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Admin,
  BusinessOwner,
  CredenzialiLogin,
  LoginResponse,
  Visitor,
} from "../interfaces/intefaces";

type AnyUser = Visitor | Admin | BusinessOwner;

interface AuthStore {
  user: AnyUser | null;
  token: string | null;
  role: string | null;
  isAuthenticated: boolean;

  login: (credenziali: CredenzialiLogin) => Promise<boolean>;
  logout: () => void;
  updateCurrentUser: (
    data: Record<string, unknown>,
  ) => Promise<boolean>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      role: null,
      isAuthenticated: false,

      login: async (credenziali: CredenzialiLogin) => {
        try {
          const api_url = import.meta.env.VITE_API_URL;
          const response = await fetch(`${api_url}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credenziali),
          });

          const accessData: LoginResponse = await response.json();
          console.log(accessData);

          if (response.ok) {
            set({
              user: accessData.user,
              token: `${accessData.type} ${accessData.token}`,
              role: accessData.role,
              isAuthenticated: true,
            });
            return true;
          } else {
            set({
              user: null,
              token: null,
              role: null,
              isAuthenticated: false,
            });
            return false;
          }
        } catch (error) {
          console.error("Errore login:", error);
          set({ user: null, token: null, role: null, isAuthenticated: false });
          return false;
        }
      },

      logout: () => {
        set({ user: null, token: null, role: null, isAuthenticated: false });
      },

      updateCurrentUser: async (
        data: Record<string, unknown>,
      ) => {
        try {
          const api_url = import.meta.env.VITE_API_URL;
          const { token } = get();
          const response = await fetch(`${api_url}/users/me`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: token ?? "",
            },
            body: JSON.stringify(data),
          });

          if (response.ok) {
            const updated: AnyUser = await response.json();
            set((state) => ({
              user: { ...state.user, ...updated } as AnyUser,
            }));
            return true;
          }
          return false;
        } catch (error) {
          console.error("Errore updateUser:", error);
          return false;
        }
      },
    }),
    { name: "auth-storage" },
  ),
);
