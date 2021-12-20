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
  // setBlock: (id) => set((state) => {
  //   if(id) state.selectedBlockId = id 
  // }),
  setBlock: (id) => 
    set(
      produce((_) => {
        _.selectedBlockId = id;
      })
    ),

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
  // addUBlock: (_in) =>
  //   set(
  //     produce((_) => {
  //       const block = _.blocks.find(el => el.id === _in.id)
  //       if(!block){
  //         _.blocks.push(_in);
  //       }
  //     })
  // ),

  setBlockAttrs: (_in) =>
    set(
      produce((_) => {
       _in.block 
        ? _in.block.attrs[_in.key] = _in.value 
        : _.blocks.find(el => el.id === _in.id).attrs[_in.key] = _in.value
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
  /* _in mode:up, mode:down, parentId, from */
  swapBlocks:(_in) =>
    set(
      produce((_) => {
        const direction = _in.mode === 'up' ? -1 : 1;
        const block = _.blocks.find((x) => x.id === _.selectedBlockId);
        const sliblings = _.blocks.filter(el => el.parentId === block.parentId)
        for (const i in sliblings) {
          if(sliblings[i].id === _.selectedBlockId){
            if(_in.mode === 'up'){
              if(parseInt(i) > 0){
                const j = _.blocks.findIndex((x) => x.id === _.selectedBlockId);
                _.blocks[j] = _.blocks.splice(j+direction, 1, _.blocks[j])[0];
              }
            } 
            if(_in.mode === 'down'){
              if(parseInt(i) < sliblings.length-1){
                const j = _.blocks.findIndex((x) => x.id === _.selectedBlockId);
                _.blocks[j] = _.blocks.splice(j+direction, 1, _.blocks[j])[0];
              }
            } 
          }
        }
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