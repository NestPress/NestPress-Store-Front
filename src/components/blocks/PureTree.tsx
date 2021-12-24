/* TODO fix type */
// @ts-ignore
// @ts-nocheck

import dynamic from "next/dynamic";
import { memo } from "react";
import { useBlocks } from "store/blocksStore";

/* TODO fix type */
// @ts-ignore: Unreachable code error
export const PureTree: React.FC<Props> = memo(
  ({ blocks, parentId = 0, level = 0, parentItem }: TreeProps) => {
    const items = blocks.filter((item) => item.parentId === parentId);
    if (!items.length) return null;
    const components = useBlocks((state) => state.components);
    const setComponent = useBlocks((state) => state.setComponent);
    return (
      <>
        {items.map((item, i) => { 
  
          if(!components[item.block]){
              setComponent({
                key: item.block,
                value: dynamic(() => import(`components/${item.block}`)),
              })
          }else{
            
            const Block: string =
              components[item.block] && components[item.block];

            /*/ indexing blinded copy of children blocks /*/
            if(item.block === 'data/QueryList'){
              item = {...item, childrenSlots:[]}
            }
            if(parentItem?.block === 'data/QueryList'){
              parentItem.childrenSlots.push(parentItem.childrenSlots.length)
              item = {...item, queryRef: parentItem.attrs.refName, queryIndex: parentItem.childrenSlots.length}
            }
            if(parentItem?.queryIndex){
              item = {...item, queryIndex: parentItem?.queryIndex, queryRef:parentItem?.queryRef}
            }
          }

          return (
            components[item.block] && (
              <Block
                attrs={{ 
                  id: item.id, 
                  i:i, 
                  queryIndex: item.queryIndex ? item.queryIndex : null,  
                  queryRef: item.queryRef ? item.queryRef : null,  
                  ...item.attrs 
                }}
                key={item.id}
                item={item}
                level={level}
              >
                <PureTree
                  blocks={blocks}
                  parentId={item.id}
                  level={level + 1}
                  item={item}
                  parentItem={item}
                />
              </Block>
            )
          );
        })}
      </>
    );
  }
);
