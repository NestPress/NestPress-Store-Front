/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { v4 as uuidv4 } from 'uuid';
import { getBy, interpolate } from 'helpers'
/* 
  templating ${} shordcodes by map query (depreciated)
*/
export const parseBlockAttrs = (attrs:any, useQueries:any) => {
  const queries = useQueries((state) => state.queries)
  const partialData = getBy(queries, attrs.dataTarget)
  partialData?.length ? partialData = partialData[attrs.queryIndex-1] : null
  return partialData ? JSON.parse(interpolate(JSON.stringify(attrs), partialData)) : attrs
}
/* 
  handling layouts, fix zero string from backend, definitly mishmashed stuff to fix
*/
export const prepareBlocks = (list:any, slugPath:string) => {
    const outBlocks = []; const handlersBlocks = {};
    // First iterator
    const i = 0, len_i = list.length;
    while (i < len_i) {
      if( list[i].parentId === "0" ){
        outBlocks[i] = { ...list[i], parentId: 0 };
        handlersBlocks[list[i].post] = {...list[i], i}; 
      }else{
        outBlocks[i] = list[i]
      } 
      i++
    }
    // Second iterator
    const j = 0, len_j = list.length;
    while (j < len_j) {
      if(list[j]?.attrs?.handler){
        const blockIndex = handlersBlocks[slugPath[1]].i
        outBlocks[blockIndex].parentId = list[j].id
      }
      j++
    }
  return  outBlocks
}
/* 
  find parent by block name
*/
export const findOutByBlock = (regBlocks:any, currentId:number, blockName:string) => {
    const block:any = regBlocks.find(el => el.id === currentId)
    if(block?.parentId == 0){
      return false
    }else{
      return block.block === blockName ? block : findOutByBlock(regBlocks, block.parentId, blockName) 
    }
    
  }
/* 
  Get blocks and change ids to unique
  Its important if to want to copy blocks
*/
export const prepareBlocksToClone = (blocks, dataToParse = {}) => {
  var text = JSON.stringify(blocks)
  blocks.map(el=>{
    text = text.replaceAll(el.id, uuidv4())
  })
  return JSON.parse(text);
} 

export const targetingAndIndexingBlocks = (item, parentItem) =>{

  if(item.block === 'data/ListData'){
    item = {...item, childrenSlots:[]}
  }
  if(parentItem?.block === 'data/ListData'){
    parentItem.childrenSlots.push(parentItem.childrenSlots.length)
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

