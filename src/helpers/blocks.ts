/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { v4 as uuidv4 } from 'uuid';
import { getBy, setBy, interpolate, findStorage } from 'helpers'
import { useApp, getFromStore, setToStore } from "store";

/* 
  templating ${} shordcodes by map query (depreciated)
*/
export const parseBlockAttrs = (attrs:any) => {
  const store = {
      forms: useApp((state) => state.forms),
      custom: useApp((state) => state.custom),
      router: useApp((state) => state.router)
    };
  if(attrs.dataTarget){
    const partialData = getFromStore(findStorage(attrs.dataTarget))
    Array.isArray(partialData) ? partialData = partialData[attrs.queryIndex-1] : null
    partialData = {...partialData, ...store}
  }else{
    partialData = {...store}
  }
  
  return partialData ? JSON.parse(interpolate(JSON.stringify(attrs), partialData)) : attrs
}
/* 
  handling layouts
*/
export const prepareBlocks = (list:any, slugPath:string) => {
  const outBlocks = []; const handlersBlocks = {};
  if(slugPath[0] == 'Page' || slugPath[0] == 'Panel'){
     // First iterator
    const i = 0, j = 0, len_i = list.length;
    while (i < len_i) {
      list[i].parentId === "0" ? handlersBlocks[list[i].post] = {...list[i], i} : null
      outBlocks[i] = { ...list[i] };
      i++
    }
    setToStore({store:"custom",ref:`handlersBlocks`, data:handlersBlocks})
    // Second iterator
    while (j < len_i) {
      list[j]?.attrs?.handler ? outBlocks[handlersBlocks[slugPath[1]]?.i]?.parentId = list[j].id : null
      j++
    }
    list = outBlocks;
  }
 
  return list
}
/* 
  find parent by block name
*/
export const findOutByBlock = (regBlocks:any, currentId:number, blockName:string) => {
    const block:any = regBlocks.find(el => el.id === currentId)
    if(block?.parentId == 0){
      return false
    }else{
      return block?.block === blockName ? block : findOutByBlock(regBlocks, block.parentId, blockName) 
    }
  }

/* 
  get childrens
*/
export const getNestedChildren = (arr: any, id: string, withFirst: boolean) => {
    const out: any = [];
    withFirst &&  out.push(arr?.filter((x:any) => x.id === id)[0]);
    for (const i in arr) {
      if (arr[i].parentId === id) {
        const children = getNestedChildren(arr, arr[i].id, false);
        if (children.length) {
          children.map((el: any) => out.push(el));
        }
        out.push(arr[i]);
      }
    }
    return out;
  };

export const getSliblings = (blocks: any, currentBlock: string,) => {
    const prepBlocks = []
    const out = {
      item:{},
      itemLeft:{},
      itemRight:{}
    }
    for (const i in blocks) {
      if(blocks[i].parentId == currentBlock.parentId){
        prepBlocks.push({
          ...blocks[i], 
          index:parseInt(i), 
          current:blocks[i].id==currentBlock.id ? true : false
        }) 
      }
    }
    for (const i in prepBlocks) {
      if(prepBlocks[i].current){
        out.index = prepBlocks[i].index
        out.item = prepBlocks[i]
        out.itemLeft = prepBlocks[parseInt(i)-1] 
        out.itemRight = prepBlocks[parseInt(i)+1] 
      }
    }
    return out
}
/* 
  Get blocks and change ids to unique
  Its important if to want to copy blocks
*/
export const prepareBlocksToClone = (blocks, dataToParse = {}) => {
  if(blocks && blocks.length >= 1){
    var text = JSON.stringify(blocks)
    blocks.map(el=>{
      text = text.replaceAll(el.id, uuidv4())
    })
    return JSON.parse(text);
  }else{
    return blocks
  }
  
} 

export const targetingAndIndexingBlocks = (item, parentItem) =>{

  if(item.block === 'data/ListData'){
    item = {...item, childrenSlots:[]}
  }
  if(parentItem?.block === 'data/ListData'){
    parentItem?.childrenSlots?.push(parentItem.childrenSlots.length)
    item = {...item, dataTarget: parentItem.attrs.dataTarget, queryIndex: parentItem.childrenSlots.length}
  }
  if(parentItem?.block === 'data/PlainData'){
    item = {...item, dataTarget: parentItem.attrs.dataTarget}
  }
  if(parentItem?.queryIndex){
    item = {...item, queryIndex: parentItem?.queryIndex}
  }
  if(parentItem?.dataTarget){
    item = {...item, dataTarget:parentItem?.dataTarget}
  }
  return item
}

/* 
  Build variables 
*/
export const buildVariables = (variables) => {
  const out = {}
  for (const [key, value] of Object.entries(variables)) {
    setBy(out, key, value)
  }
  return out
}




