import { create } from 'zustand';

export interface IField {
    id: number;
    name: string;
    slug: string;
    count: string;
    cost: number;
    costNotLimited: number;
    max: string;
    notLimited: boolean;
}

export interface IConstructorStore {
    fields: IField[];
    setFields: (v: IField[]) => void;
}

export const useConstructorStore = create<IConstructorStore>((set) => ({
    fields: [],
    setFields: (fields) => set({ fields }),
}));
