import { create } from "zustand";

interface State {
    categoryActiveId:number;
    setCategoryActiveId(categoryActiveId:number):void;
}

export const useCategoryStore = create<State>((set) => ({
    categoryActiveId:0,
    setCategoryActiveId:(categoryActiveId:number) => set({categoryActiveId:categoryActiveId}),
}));

