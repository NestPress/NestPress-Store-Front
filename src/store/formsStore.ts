import create from "zustand";
import produce from "immer";
import { setByPath } from "components/blocks/helpers/blocks"

const useForms = create((set) => ({ 
  forms:{},
  addForm: (_in) =>
    set(
      produce((_) => {
        _.forms[_in.ref] = _in.data;
        console.log('register form',_in.ref, _.forms[_in.ref])
      })
    ),  
  updateForm: (_in) =>
    set(
      produce((_) => {
        setByPath(_.forms[_in.ref], _in.path, _in.data )
        // _.forms.default_form?.data?.input_value =_in.data;
       
      })
    ),  
}));

const getForm = (_in) => {
  return useForms.getState().forms[_in.ref];
}

export { useForms, getForm };