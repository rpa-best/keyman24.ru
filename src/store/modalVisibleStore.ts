import { create } from 'zustand';

export interface IModalStore {
    visible: boolean;
    setVisible: (v: boolean) => void;
}

export const useModalStore = create<IModalStore>((set) => ({
    visible: false,
    setVisible: (visible) => set({ visible: visible }),
}));
