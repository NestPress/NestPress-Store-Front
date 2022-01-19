import {
  useApp,
  setToStore,
  getFromStore,
  useBlocks,
  pushByIndex,
  itemById,
} from "store";
import { getNestedChildren, prepareBlocksToClone } from "helpers";
import { KeyboardEvent } from "react";

export const keysHandler = (
  e: KeyboardEvent<HTMLDivElement>,
  blocks: never[],
  targeter: any,
  res: { (res: any): void; (arg0: { insert: never[]; update: never[] }): any }
) => {
  if (!document.activeElement) {
    return null;
  }
  if (
    document.activeElement.tagName !== "INPUT" &&
    document.activeElement.tagName !== "TEXTAREA"
  ) {
    const key = e.which || e.keyCode,
      ctrl = e.ctrlKey ? e.ctrlKey : key === 17 ? true : false;
    if (key == 86 && ctrl) {
      // CTRL + V
      if (targeter.id) {
        const toPaste = prepareBlocksToClone(
          getFromStore({ store: "custom", ref: `blocksCopy` })
        );
        if (toPaste) {
          toPaste[0].parentId = targeter.id;
          const item = itemById({
            store: "display",
            ref: "blocks.id",
            data: targeter.id,
          });
          const index = item.index;
          toPaste.map((el: any, i: any) => {
            pushByIndex({
              store: "display",
              ref: `blocks.${index + i + 1}`,
              data: { ...el, post: targeter.post, insert: true },
            });
          });
        }
        const blocks = getFromStore({ store: "display", ref: `blocks` });
        const reorderBlocks: {
          insert: any[],
          update: any[]
        } = {
          insert: [],
          update: [],
        }
        for (const i in blocks) {
          if (blocks[i].post == targeter.post) {
            const set = {
              id: blocks[i].id,
              parentId: blocks[i].parentId,
              post: blocks[i].post,
              block: blocks[i].block,
              attrs: blocks[i].attrs,
              order: parseInt(i), // index + i?
            };
            if (blocks[i].insert) {
              reorderBlocks.insert.push(set);
            } else {
              reorderBlocks.update.push(set);
            }
          }
        }
        return res(reorderBlocks);

        // const order = toPaste[0].order;
        // const blocksToSave = toPaste.map(el=>{return{
        //   id: el.id,
        //   parentId: el.parentId,
        //   attrs: el.attrs,
        //   block: el.block,
        //   post: slugPath[1],
        //   order:order++
        // }})
        // addNewBlocks({variables:{input:{blocks:blocksToSave}}})
      }
    } else if (key == 67 && ctrl) {
      // CTRL + C
      const parsedEls = getNestedChildren(blocks, targeter.id, true);
      setToStore({ store: "custom", ref: `blocksCopy`, data: parsedEls });
      useBlocks.setState({ composerTab: "keyCopy" });
      useBlocks.setState({ panel: "mainPanel" });
    }
  }
};
