// @ts-nocheck
import create from "zustand";
import produce from "immer";
const useBlocks = create((set) => ({
  
  panel: 'mainPanel',
  composerTab: 'page',
  insertBlocksType: 'layout',
  preview: false,
  replace: false,
  components:{},
  blocks:[],
  selectedBlockId: null,
  setComponent: (_in) =>
    set(
      produce((_) => {
        _.components[_in.key] = _in.value
      })
    ),
  setBlock: (id) => set((state) => {
    if(id) state.selectedBlockId = id 
  }),
  addBlock: (_in) =>
    set(
      produce((_) => {
        _.blocks.push(_in);
      })
    ),
  setBlockAttrs: (_in) =>
    set(
      produce((_) => {
        const block = _.blocks.find(el => el.id === _.selectedBlockId)
        block.attrs[_in.key] = _in.value

      })
    ),
  setBlockParentId: (_in) =>
    set(
      produce((_) => {
        const block = _.blocks.find(el => el.id === _in.current)
        block.parentId = _in.parent
        _.replace = false
      })
    ),
  removeBlock: () =>
    set(
      produce((_) => {
        const i = _.blocks.findIndex(el => el.id === _.selectedBlockId);
        _.blocks.splice(i, 1);
      })
    ),
}));

export { useBlocks };