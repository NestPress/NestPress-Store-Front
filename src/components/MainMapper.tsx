/* TODO fix type */
// @ts-ignore
// @ts-nocheck

import dynamic from "next/dynamic";
import { memo } from "react";
import { useApp } from "store";
import { targetingAndIndexingBlocks } from "helpers";

export const MainMapper: React.FC<Props> = memo(
  ({ blocks, parentId, level = 0, parentItem, layout, router }: TreeProps) => {
    const items = blocks.filter((el) => el?.parentId === parentId);
    if (!items.length) return null;

    const components = useApp((state) => state.components);
    const setStore = useApp((state) => state.setStore);

    return (
      <>
        {items.map((el, i) => {
          if (!components[el?.block]) {
            setStore({
              store: "components",
              ref: el?.block,
              data: dynamic(() => import(`components/${el.block}`)),
            });
          } else {
            const Block: string = components[el.block];
            el = targetingAndIndexingBlocks(el, parentItem);
          }
          return (
            components[el.block] && (
              <Block
                attrs={{
                  id: el.id,
                  // i: el.i,
                  ...(el.queryIndex && { queryIndex: el.queryIndex }),
                  ...(el.dataTarget && { dataTarget: el.dataTarget }),
                  ...el.attrs,
                }}
                key={el.id}
                level={level}
              >
                <MainMapper
                  blocks={blocks}
                  parentId={el.id}
                  level={level + 1}
                  parentItem={el}
                  layout={layout}
                  router={router}
                />
              </Block>
            )
          );
        })}
      </>
    );
  }
);
