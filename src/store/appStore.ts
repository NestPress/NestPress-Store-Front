// @ts-nocheck
import create from "zustand";
import produce from "immer";
import { setBy, getBy ,setImmutable} from "helpers"

const useApp = create((set) => ({
  custom:{
    activeTargeter:false
  },
  components:{},
  forms:{},
  queries:{},
  router:{
    slugPath:["Page","home"]
  },
  actions:{
    history:[],
    output:{}
  },
  display:{
    layout:[],
    blocks:[]
  },
  params:[],
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

const removeById = (_in) => {
  const i = 0
  const nextState = produce(useApp.getState()[_in.store] , draft => {
    const a = getBy(draft, _in.ref.split('.').slice(0, -1).join('.'));
    i = a.findIndex(el => el[_in.ref.split('.').pop()] === _in.data)
    a.splice(i, 1);
  })
  useApp.setState({[_in.store]: nextState}); 
  return {index:i} 
}

const pushToStore = (_in) => {
  const nextState = produce(useApp.getState()[_in.store] , draft => {
   try{ setBy(draft,`${_in.ref}`,[...getBy(draft, _in.ref), _in.data]) } catch (error) { console.error('push to store error:',error) }
  })
  useApp.setState({[_in.store]: nextState});  
}

const pushByIndex = (_in) => {
  const nextState = produce(useApp.getState()[_in.store] , draft => {
    const a = getBy(draft, _in.ref.split('.').slice(0, -1).join('.'));
    a.splice(_in.ref.split('.').pop(), 0, _in.data);
  })
  useApp.setState({[_in.store]: nextState}); 
}

const itemById = (_in) => {
  const a = getBy(useApp.getState()[_in.store], _in.ref.split('.').slice(0, -1).join('.'));
  const i = a.findIndex(el => el[_in.ref.split('.').pop()] === _in.data)
  return {
    index:i, 
    item:a[i],     
    itemLeft:a[parseInt(i)-1],
    itemRight:a[parseInt(i)+1],
  }
}

export { useApp, getFromStore, setToStore, pushToStore, pushByIndex, removeById, itemById};


