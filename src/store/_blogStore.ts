/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import create from "zustand";
import produce from "immer";

const useBlog = create((set) => ({ 
  version:'0.1'
}));

export { usePage };