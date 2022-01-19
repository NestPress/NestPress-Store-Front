import { findOutByBlock } from "helpers";

export const fieldHead = (useApp: any, attrs: any) => {
  const blocks = useApp((state: any) => state.display.blocks);
  return {
    blocks: blocks,
    updateData: useApp((state: any) => state.updateData),
    ref: findOutByBlock(blocks, attrs.id, "form/Form")?.attrs?.refName,
  };
};
