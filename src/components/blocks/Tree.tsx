/* TODO fix type */
// @ts-ignore
// @ts-nocheck

import dynamic from "next/dynamic";
import { useBlocks, useQueries } from "store/blocksStore";
import { UPDATE_BLOCK } from "components/blocks/gql/composer"
import { useMutation } from '@apollo/client';
import { Targeter } from "components/blocks";

/* TODO fix type */
// @ts-ignore: Unreachable code error
export const Tree: React.FC<Props> = 
  ({ blocks, parentId = 0, level = 0, parentItem }: TreeProps) => {
    const items = blocks.filter((item) => item.parentId === parentId);
    // .sort((a, b) => (a.text > b.text ? 1 : -1)); - change sort
    if (!items.length) return null;

    const selectedBlockId = useBlocks((state) => state.selectedBlockId);
    const components = useBlocks((state) => state.components);
    const setComponent = useBlocks((state) => state.setComponent);
    const block = () => blocks.find((x) => x.id === selectedBlockId);

    /* mutation */
    const [updateBlock, { data, loading, error }] = useMutation(UPDATE_BLOCK, {
      onCompleted(data) {
          // console.log('insert block', data.createBlock)
          // addBlock(data.createBlock);
      }, 
      update: (cache) => {
        cache.evict({ id: "ROOT_QUERY", fieldName: "getBlocks" });
      },
    });

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
                  <Targeter type="layer" level={level} item={item} />
                  {item.attrs.handler && <div className="bg-pink-400 rounded text-xs p-1 w-40 m-1 text-white">Handler {item.attrs.handler}</div>}
                  <Tree
                    blocks={blocks}
                    parentId={item.id}
                    level={level + 1}
                    item={item}
                    parentItem={item}
                  />
                  <Targeter type="tab" level={level} item={item} />
                </Block>
            )
          );
        })}
      </>
    );
  }
;
