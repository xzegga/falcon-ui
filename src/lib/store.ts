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

  uploadFile: async (payload: { id: string; file: File }) => {
    console.log('payload ',payload)
    set({ loading: true });
    const { id, file } = payload;
    const formData = new FormData();

    formData.append("id", id);
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
