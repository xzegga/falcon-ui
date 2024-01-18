import { create } from "zustand";
import axios from "axios";

export const useSurvey = create((set) => ({
    loadingdb: false,
    errordb: undefined,
    resultdb: undefined,

    insert: async (payload: any) => {
      set({ loadingdb: true });

      try {
        const response = await axios.post("/api/survey", payload);
        set({ resultdb: response.data });
        set({ loadingdb: false });
      } catch (e) {
        set({ errordb: e });
        set({ loadingdb: false });
      }
    },
  }));
