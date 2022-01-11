/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import create from "zustand";
import produce from "immer";

const useQueries = create((set) => ({ 
  queries:{},
  addQuery: (_in) =>
    set(
      produce((_) => {
        _.queries[_in.ref] = _in.data;
      })
    ),  
}));

export { useQueries };