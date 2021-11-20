import create from "zustand";
import produce from "immer";

const useBlocks = create((set) => ({
  
  panel: 'mainPanel',
  composerTab: 'page',
  insertBlocksType: 'layout',
  preview: false,
  replace: false,
  
  blocks:[
    { "id": 1, "parentId": 0, block:"layout/Grid", layout:null, page:'home', attrs:{columns:'', colspan:'', rowspan:'', background:''} }
  ],
  selectedBlockId: null,
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
        const block = _.blocks.find(x => x.id === _.selectedBlockId)
        block.attrs[_in.key] = _in.value

      })
    ),
  setBlockParentId: (_in) =>
    set(
      produce((_) => {
        const block = _.blocks.find(x => x.id === _in.current)
        block.parentId = _in.parent
        _.replace = false
      })
    ),
}));

export { useBlocks };