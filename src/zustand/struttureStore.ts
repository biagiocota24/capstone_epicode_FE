import { create } from "zustand";
import type { StrutturaResponse } from "../interfaces/struttureInterfaces";
import { persist } from "zustand/middleware";
import type { TipologiaStruttura } from "../interfaces/enumsInterfaces";

interface StruttureStore {
  strutture: StrutturaResponse[];
  loading: boolean;
  error: string | null;

  // ✅ Info paginazione
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  isFirst: boolean;
  isLast: boolean;

  getStrutture: (
    page?: number,
    size?: number,
    tipologia?: string,
    cittaId?: string,
  ) => Promise<void>;
}

export const useStruttureStore = create<StruttureStore>()(
  persist(
    (set) => ({
      strutture: [],
      loading: false,
      error: null,

      // ✅ Valori iniziali paginazione
      currentPage: 0,
      totalPages: 0,
      totalElements: 0,
      pageSize: 12,
      isFirst: true,
      isLast: false,

      getStrutture: async (
        page = 0,
        size?: number,
        tipologia?: string,
        cittaId?: string,
      ) => {
        const params = new URLSearchParams();
        if (page) params.append("page", page.toString());
        if (size) params.append("size", size.toString());
        if (tipologia) params.append("tipologia", tipologia);
        if (cittaId) params.append("cittaId", cittaId);

        set({ loading: true, error: null });
        try {
          const api_url = import.meta.env.VITE_API_URL;
          const response = await fetch(
            `${api_url}/strutture?${params.toString()}`,
          );

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }

          const data = await response.json();

          // ✅ Salva TUTTO
          set({
            strutture: data.content || [],
            currentPage: data.number ?? 0,
            totalPages: data.totalPages ?? 0,
            totalElements: data.totalElements ?? 0,
            pageSize: data.size ?? 12,
            isFirst: data.first ?? true,
            isLast: data.last ?? false,
            loading: false,
          });
        } catch (error) {
          const errorMsg =
            error instanceof Error ? error.message : "Errore sconosciuto";
          console.error("Errore fetch strutture:", errorMsg);
          set({
            error: errorMsg,
            loading: false,
            strutture: [],
          });
        }
      },
    }),
    { name: "strutture-storage" },
  ),
);
