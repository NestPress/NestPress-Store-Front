export type blockType = {
  id: string;
  parentId: string;
  attrs: any;
  order: number;
  post: string;
  block: string;

  i?: number;
  dataTarget?: string;
  childrenSlots?: any;
  queryIndex?: number;
};
export type blocksType = blockType[];
