import { create } from 'zustand';

export interface IConstructorStore {
    fields: { name: string; count: string }[];
    setFields: (v: { name: string; count: string }[]) => void;
}

export const useConstructorStore = create<IConstructorStore>((set) => ({
    fields: [],
    setFields: (fields) => set({ fields }),
}));
