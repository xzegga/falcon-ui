"use client"

import { create } from 'zustand'

export const useGlobalStore = create((set) => ({
  someValue: null,
  updateSomeValue: () => set((state:any) => ({ someValue: state.someValue })),
}))