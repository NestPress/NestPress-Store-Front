/* TODO fix type */
// @ts-ignore
// @ts-nocheck

import dynamic from "next/dynamic";
import { memo } from "react";
import { useBlocks } from "store/blocksStore";

/* TODO fix type */
// @ts-ignore: Unreachable code error
export const Tree: React.FC<Props> = memo(
  ({ blocks, parentId = 0, level = 0 }: TreeProps) => {
    const items = blocks.filter((item) => item.parentId === parentId);
    // .sort((a, b) => (a.text > b.text ? 1 : -1)); - change sort
    if (!items.length) return null;

    const setBlock = useBlocks((state) => state.setBlock);
    const selectedBlockId = useBlocks((state) => state.selectedBlockId);
    const preview = useBlocks((state) => state.preview);
    const replace = useBlocks((state) => state.replace);
    const setBlockParentId = useBlocks((state) => state.setBlockParentId);
    const components = useBlocks((state) => state.components);
    const setComponent = useBlocks((state) => state.setComponent);

    return (
      <>
        {items.map((item) => {
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
              <div
                style={{ minHeight: "30px" }}
                className={`
            ${
              !preview
                ? "border border-white p-px border-l-gray-300 border-gray-200 cursor-pointer border-l-8 m-px border-opacity-50"
                : ""
            } 
            ${item?.attrs?.colspan && "col-span-" + item.attrs.colspan} 
            ${item?.attrs?.rowspan && "row-span-" + item.attrs.rowspan} 
            ${selectedBlockId == item.id && "border-blue-800"} 
            relative hover:border hover:border-pink-500 hover:border-opacity-50`}
                key={`block-${item.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!replace) {
                    setBlock(item.id);
                    useBlocks.setState({ panel: "block" });
                  } else {
                    if (selectedBlockId === item.id) {
                      alert("You set this same block, select another");
                    } else {
                      useBlocks.setState({ panel: "block" });
                      setBlockParentId({
                        parent: item.id,
                        current: selectedBlockId,
                      });
                    }
                  }
                }}
              >
                <Block
                  attrs={{ id: item.id, ...item.attrs }}
                  key={item.id}
                  item={item}
                  level={level}
                >
                  <Tree
                    blocks={blocks}
                    parentId={item.id}
                    level={level + 1}
                    item={item}
                  />
                </Block>
                <div
                  style={{ bottom: "-20px", right: "-1px", zIndex: 1000 }}
                  className={`absolute text-xs text-white bg-blue-800 bg-opacity-50 p-0.5 ${
                    selectedBlockId == item.id ? "visible" : "invisible"
                  }`}
                >
                  {item.block}
                </div>
              </div>
            )
          );
        })}
      </>
    );
  }
);
