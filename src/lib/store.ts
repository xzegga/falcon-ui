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
  status: 'iddle',

  uploadFile: async (payload: { id: string; file: File; type: string }) => {
    set({ loading: true });
    const { id, file, type } = payload;
    const formData = new FormData();

    formData.append("id", id);
    formData.append("file", file);
    formData.append("type", type);

    try {
      const response = await axios.post("/api/file/upload", formData);
      set({ result: response.data });
      set({ loading: false });
      set({ status: 'success' })
    } catch (e) {
      set({ error: e });
      set({ loading: false });
      set({ status: 'error' })
    }
  },
}));
