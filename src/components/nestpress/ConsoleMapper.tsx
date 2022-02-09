/* TODO fix type */
// @ts-ignore
// @ts-nocheck

import dynamic from "next/dynamic";
import { memo } from "react";
import { useApp } from "store";
import { Targeter } from "components/nestpress/Targeter";
import { targetingAndIndexingBlocks } from "helpers";

export const ConsoleMapper: React.FC<Props> = memo(
  ({ blocks, parentId, level = 0, parentItem, layout, router }: TreeProps) => {
    const items = blocks.filter((el) => el?.parentId === parentId);
    if (!items.length) return null;

    const components = useApp((state) => state.components);
    const setStore = useApp((state) => state.setStore);
    return (
      <>
        {items.map((el, i) => {
          if (!components[el.block]) {
            setStore({
              store: "components",
              ref: el.block,
              data: dynamic(() => import(`components/${el.block}`)),
            });
          } else {
            const Block: string = components[el.block];
            el = targetingAndIndexingBlocks(el, parentItem);
            /* add editable class if is editable mode */
            const attrs = Object.assign({}, el.attrs);
            attrs.classes = attrs.classes + "  block-editable";
          }
          return (
            components[el.block] && (
              <Block
                attrs={{
                  i: i,
                  id: el.id,
                  ...(el.queryIndex && { queryIndex: el.queryIndex }),
                  ...(el.dataTarget && { dataTarget: el.dataTarget }),
                  ...attrs,
                }}
                key={el.id}
                level={level}
              >
                <Targeter type="before" level={level} item={el} />
                <ConsoleMapper
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
