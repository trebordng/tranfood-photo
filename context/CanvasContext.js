import { create } from "zustand";

//State for Images, Blogs and Recipes List
export const ListState = create((set) => ({
  lists: {Food:[],Drink:[],Lifestyle:[],Action:[]},
  setLists: (name, list) =>
    set((state) => {
      state.lists[name] = list;
      return { lists: state.lists };
    }),
}));
