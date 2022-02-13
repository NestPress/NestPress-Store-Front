// @ts-nocheck
import create from "zustand";
import produce from "immer";
import { setBy } from "helpers"

const useKeys = create((set) => ({
  keys:{},
  addKeys: (_keys) =>
    set(
      produce((_) => {
        _.keys=_keys;
      })
    ),
  resetKey: (_index) =>
    set(
      produce((_) => {
        _.keys[_index] = Math.floor(Math.random() * 99999)
      })
    ),
  updateKey: (_in) =>
    set(
      produce((_) => {
        setBy(_.keys[_in.id], _in.path, _in.data)
      })
    ),   
}));
const getKey = (_id) => {
  return useKeys.getState().keys[_id];
}
export { useKeys , getKey};