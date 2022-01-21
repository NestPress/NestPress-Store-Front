// @ts-ignore
import { v4 as uuidv4 } from "uuid";
import { setBy, interpolate, findStorage } from "helpers";
import { useApp, getFromStore, setToStore } from "store";
import { blockType, blocksType } from "types/blocks";

export const parseBlockAttrs = (attrs: any) => {
  const store = {
    forms: useApp((state) => state.forms),
    custom: useApp((state) => state.custom),
    router: useApp((state) => state.router),
  };
  let partialData = {};
  if (attrs.dataTarget) {
    partialData = getFromStore(findStorage(attrs.dataTarget));
    Array.isArray(partialData)
      ? (partialData = partialData[attrs.queryIndex - 1])
      : null;
    partialData = { ...partialData, ...store };
  } else {
    partialData = { ...store };
  }

  return partialData
    ? JSON.parse(interpolate(JSON.stringify(attrs), partialData))
    : attrs;
};

/* 
  find parent by block name
*/
export const findOutByBlock: any = (
  regBlocks: blocksType,
  currentId: string,
  blockName: string
) => {
  const block: any = regBlocks.find((el: blockType) => el.id === currentId);
  if (block?.parentId == 0) {
    return false;
  } else {
    return block?.block === blockName
      ? block
      : findOutByBlock(regBlocks, block.parentId, blockName);
  }
};

/* 
get childrens
*/
export const getNestedChildren = (arr: any, id: string, withFirst: boolean) => {
  const out: any = [];
  withFirst && out.push(arr?.filter((x: any) => x.id === id)[0]);
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

export const getSliblings = (blocks: blocksType, currentBlock: blockType) => {
  const prepBlocks = [];
  const out = {
    index: 0,
    item: {},
    itemLeft: {},
    itemRight: {},
  };
  for (const i in blocks) {
    if (blocks[i].parentId == currentBlock.parentId) {
      prepBlocks.push({
        ...blocks[i],
        index: parseInt(i),
        current: blocks[i].id == currentBlock.id ? true : false,
      });
    }
  }
  for (const i in prepBlocks) {
    if (prepBlocks[i].current) {
      out.index = prepBlocks[i].index;
      out.item = prepBlocks[i];
      out.itemLeft = prepBlocks[parseInt(i) - 1];
      out.itemRight = prepBlocks[parseInt(i) + 1];
    }
  }
  return out;
};
/* 
Get blocks and change ids to unique
Its important if to want to copy blocks
*/
export const prepareBlocksToClone = (blocks: blocksType, dataToParse = {}) => {
  if (blocks && blocks.length >= 1) {
    var text = JSON.stringify(blocks);
    blocks.map((el: blockType) => {
      text = text.replaceAll(el.id, uuidv4());
    });
    return JSON.parse(text);
  } else {
    return blocks;
  }
};

export const targetingAndIndexingBlocks = (
  block: blockType,
  parentItem: any
) => {
  if (block.block === "data/ListData") {
    block = { ...block, childrenSlots: [] };
  }
  if (parentItem?.block === "data/ListData") {
    parentItem?.childrenSlots?.push(parentItem.childrenSlots.length);
    block = {
      ...block,
      dataTarget: parentItem.attrs.dataTarget,
      queryIndex: parentItem.childrenSlots.length,
    };
  }
  if (parentItem?.block === "data/PlainData") {
    block = { ...block, dataTarget: parentItem.attrs.dataTarget };
  }
  if (parentItem?.queryIndex) {
    block = { ...block, queryIndex: parentItem?.queryIndex };
  }
  if (parentItem?.dataTarget) {
    block = { ...block, dataTarget: parentItem?.dataTarget };
  }
  return block;
};

/* 
  Build variables 
*/
export const buildVariables = (variables: any) => {
  const out = {};
  for (const [key, value] of Object.entries(variables)) {
    setBy(out, key, value);
  }
  return out;
};
