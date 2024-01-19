import { create } from "zustand";
import axios from "axios";

export const useSurvey = create((set) => ({
    loadingdb: false,
    errordb: undefined,
    resultdb: undefined,
    resultdbbyid: undefined,
    status: 'iddle',

    insert: async (payload: any) => {
      set({ loadingdb: true });

      try {
        const response = await axios.post("/api/survey", payload);
        set({ resultdb: response.data });
        set({ loadingdb: false });
        set({ status: 'success' });
      } catch (e) {
        set({ errordb: e });
        set({ loadingdb: false });
        set({ status: 'error' });
      }
    },

    get: async (id: string) => {
        set({ loadingdb: true });
        try {
          const url= id ? `/api/survey?id=${id}` : "/api/survey"
          const response = await axios.get(url);
          id ? set({ resultdbbyid: response.data }) : set({ resultdb: response.data });
          set({ loadingdb: false });
        } catch (e) {
          set({ errordb: e });
          set({ loadingdb: false });
        }
      },
    update: async (id: string, payload: any) => {
        set({ loadingdb: true });

        try {
            const url= id ? `/api/survey?id=${id}` : "/api/survey"
            const response = await axios.put(url, payload);
            set({ resultdb: response.data });
            set({ loadingdb: false });
        } catch (e) {
            set({ errordb: e });
            set({ loadingdb: false });
        }
    },
    remove: async (id: string) => {
        set({ loadingdb: true });

        try {
            const url= id ? `/api/survey?id=${id}` : "/api/survey"
            const response = await axios.delete(url);
            set({ resultdb: response.data });
            set({ loadingdb: false });
        } catch (e) {
            set({ errordb: e });
            set({ loadingdb: false });
        }
    },
  }));
