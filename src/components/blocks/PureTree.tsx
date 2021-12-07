/* TODO fix type */
// @ts-ignore
// @ts-nocheck

import dynamic from "next/dynamic";
import { memo } from "react";
import { useBlocks } from "store/blocksStore";

/* TODO fix type */
// @ts-ignore: Unreachable code error
export const PureTree: React.FC<Props> = memo(
  ({ blocks, parentId = 0, level = 0 }: TreeProps) => {
    const items = blocks.filter((item) => item.parentId === parentId);
    // .sort((a, b) => (a.post > b.post ? 1 : -1)); 
    if (!items.length) return null;
    const setBlock = useBlocks((state) => state.setBlock);
    const components = useBlocks((state) => state.components);
    const setComponent = useBlocks((state) => state.setComponent);
    return (
      <>
        {items.map((item, i) => {
          !components[item.block]
            ? setComponent({
                key: item.block,
                value: dynamic(() => import(`components/${item.block}`)),
              })
            : null;

          const Block: string =
            components[item.block] && components[item.block];
          return (
            components[item.block] && (
                <Block
                  attrs={{ id: item.id, i:i, ...item.attrs }}
                  key={item.id}
                  item={item}
                  level={level}
                >
                  <PureTree
                    blocks={blocks}
                    parentId={item.id}
                    level={level + 1}
                    item={item}
                  />
                </Block>
            )
          );
        })}
      </>
    );
  }
);
