/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import create from "zustand";
import produce from "immer";

const useComposer = create((set) => ({ 
  version:'0.1',
  posts:[],
  users:[],
}));

export { usePage };