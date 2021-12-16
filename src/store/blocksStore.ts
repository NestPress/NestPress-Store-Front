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
  copiedBlocksIds:[],
  copiedBlocks:[],
  selectedBlockId: null,
  blocksPocket: false,
  message:'',
  messageType:'success',
  currentPage:{},
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
  addBlocks: (_in) =>
    set(
      produce((_) => {
        _.blocks = [..._.blocks, ..._in]
      })
    ),
  addUBlock: (_in) =>
    set(
      produce((_) => {
        const block = _.blocks.find(el => el.id === _in.id)
        if(!block){
          _.blocks.push(_in);
        }
      })
  ),
    
  setBlockAttrs: (_in) =>
    set(
      produce((_) => {
        const block = _.blocks.find(el => el.id === _in.id)
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
  removeBlock: (_in) =>
    set(
      produce((_) => {
        const i = _.blocks.findIndex(el => el.id === _in);
        _.blocks.splice(i, 1);
      })
    ),
  addQueryIndex: (_in) =>
    set(
      produce((_) => {
        _.queryIndexes[_in.id] = parseInt(_.queryIndexes[_in.id] || 0) + 1;
      })
    ),  
}));

const getBlocks = () => {
  return useBlocks.getState()['blocks'];
}


export { useBlocks , getBlocks};