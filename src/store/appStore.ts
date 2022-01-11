// @ts-nocheck
import create from "zustand";
import produce from "immer";
import { setBy, getBy ,setImmutable} from "helpers"

const useApp = create((set) => ({
  custom:{activeTargeter:false},
  components:{},
  forms:{},
  queries:{},
  router:{
    slugPath:["Page","home"]
  },
  display:{
    layout:[],
    blocks:[]
  },
  setStore: (_in) =>
    set(
      produce((_) => {
        _[_in.store][_in.ref] = _in.data;
      })
    ), 
  updateData: (_in) =>
    set(
      produce((_) => {
        setBy(_?.[_in.store][_in.ref], _in.path, _in.data)
      })
    ),   
}));

const getFromStore = (_in) => {
  const out = useApp.getState()[_in.store];
  return _in.ref &&  out ? getBy(out, _in.ref) : out ? out : _in.ref
}

const setToStore = (_in) => {
  const nextState = produce(useApp.getState()[_in.store] , draft => {
    setBy(draft,`${_in.ref}`, _in.data)
  })
  useApp.setState({[_in.store]: nextState});  
}
const pushToStore = (_in) => {
  const nextState = produce(useApp.getState()[_in.store] , draft => {
    const array = getBy(draft, _in.ref);
    setBy(draft,`${_in.ref}`,[...array, _in.data])
  })
  useApp.setState({[_in.store]: nextState});  
}

export { useApp, getFromStore, setToStore, pushToStore};