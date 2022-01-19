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
  handling layouts
*/
export const prepareBlocks = (list: blocksType, slugPath: string) => {
  const outBlocks: blocksType = [];
  const handlersBlocks: any = {};
  if (slugPath[0] == "Page" || slugPath[0] == "Panel") {
    // First iterator
    let i = 0,
      j = 0,
      len_i = list.length;
    while (i < len_i) {
      list[i].parentId === "0"
        ? (handlersBlocks[list[i].post] = { ...list[i], i })
        : null;
      outBlocks[i] = { ...list[i] };
      i++;
    }
    setToStore({
      store: "custom",
      ref: `handlersBlocks`,
      data: handlersBlocks,
    });
    // Second iterator
    while (j < len_i) {
      const out =
        handlersBlocks[slugPath[1]]?.length > 0
          ? outBlocks[handlersBlocks[slugPath[1]].i]
          : null;
      out && list[j]?.attrs?.handler ? (out.parentId = list[j].id) : null;
      j++;
    }
    list = outBlocks;
  }

  return list;
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
