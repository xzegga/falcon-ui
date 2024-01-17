"use client";

import { create } from "zustand";
import axios from "axios";

export const useGlobalStore = create((set) => ({
  someValue: null,
  updateSomeValue: () => set((state: any) => ({ someValue: state.someValue })),
}));

export const useUploadFile = create((set) => ({
  loading: false,
  error: undefined,
  result: undefined,

  uploadFile: async (payload: { survey_id: string; file: File }) => {
    set({ loading: true });
    console.log('payload ',payload)
    const { survey_id, file } = payload;
    const formData = new FormData();

    formData.append("id", survey_id);
    formData.append("file", file);

    try {
      const response = await axios.post("/api/UploadFile", formData);
      set({ result: response.data });
      set({ loading: false });
    } catch (e) {
      set({ error: e });
      set({ loading: false });
    }
  },
}));
