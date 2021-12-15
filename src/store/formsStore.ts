/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import create from "zustand";
import produce from "immer";
import { setByPath } from "components/blocks/helpers/blocks"

const useForms = create((set) => ({ 
  forms:{},
  pageData:{},
  globalData:{},
  addForm: (_in) =>
    set(
      produce((_) => {
        _.forms[_in.ref] = _in.data;
      })
    ),  
  updateForm: (_in) =>
    set(
      produce((_) => {
        setByPath(_.forms[_in.ref], _in.path, _in.data )
      })
    ),  
}));

const getForm = (_in) => {
  return useForms.getState().forms[_in.ref];
}

export { useForms, getForm };