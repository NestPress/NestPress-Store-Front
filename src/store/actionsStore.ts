/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import create from "zustand";
import produce from "immer";
import { setByPath } from "components/blocks/helpers/blocks"

const useActions = create((set) => ({ 
  actions:[],
  addAction: (_in) =>
    set(
      produce((_) => {
        _.actions.push({type:_in.type, key:_in.key, value:_in.value});
      })
    ),
}));

export { useActions };