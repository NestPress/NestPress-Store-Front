/* TODO fix type */
// @ts-ignore
// @ts-nocheck

import dynamic from "next/dynamic";
import { useBlocks, useQueries } from "store/blocksStore";


/* TODO fix type */
// @ts-ignore: Unreachable code error
export const Tree: React.FC<Props> = 
  ({ blocks, parentId = 0, level = 0, parentItem }: TreeProps) => {
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
              <div
                style={!preview ? { minHeight: "30px", minWidth: "20px" } : null}
                className={`
                  ${
                    !preview
                      ? "border-white p-px border-l-gray-300 border-gray-200 cursor-pointer border-l-8 m-px border-opacity-50"
                      : ""
                  } 
                  ${item?.attrs?.colspan && "col-span-" + item.attrs.colspan} 
                  ${item?.attrs?.rowspan && "row-span-" + item.attrs.rowspan} 
                  ${item?.attrs?.gridflow && item.attrs.gridflow} 
                  ${selectedBlockId == item.id && "border-blue-800"} 
                  relative hover:border hover:border-pink-500 hover:border-opacity-50`}
                key={`block-${item.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if(!item.cloneIndex){
                    if (!replace) {
                      setBlock(item.id);
                      useBlocks.setState({ panel: "block", composerTab: null });
                    } else {
                      if (selectedBlockId === item.id) {
                        alert("You set this same block, select another");
                      } else {
                        useBlocks.setState({ panel: "block", composerTab: null });
                        setBlockParentId({
                          parent: item.id,
                          current: selectedBlockId,
                        });
                      }
                    }
                  }else{
                    alert('Clone element is not editable')
                  }
                  
                }}
              >
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
                  {item.attrs.handler && <div className="bg-pink-400 rounded text-xs p-1 w-40 m-1 text-white">Handler {item.attrs.handler}</div>}
                  <Tree
                    blocks={blocks}
                    parentId={item.id}
                    level={level + 1}
                    item={item}
                    parentItem={item}
                  />
                </Block>
                <div
                  style={{ top: "-20px", left: "-1px", zIndex: 1000 }}
                  className={`absolute text-xs text-white bg-blue-800 bg-opacity-50 p-0.5 ${
                    selectedBlockId == item.id ? "visible" : "invisible"
                  }`}
                >
                  {item.block}
                </div>
                <div
                  style={{ top: "0", left: "-1px", zIndex: 1000, borderTop:"1px dashed #8e9fd7", width:"100%" }}
                  className={`absolute ${
                    selectedBlockId == item.id ? "visible" : "invisible"
                  }`}
                ></div>
                <div
                  style={{ bottom: "0", left: "-1px", zIndex: 1000, borderBottom:"1px dashed #8e9fd7", width:"100%" }}
                  className={`absolute ${
                    selectedBlockId == item.id ? "visible" : "invisible"
                  }`}
                ></div>
                <div
                  style={{ top: "0", right: "0", zIndex: 1000, borderRight:"1px dashed #8e9fd7", height:"100%" }}
                  className={`absolute ${
                    selectedBlockId == item.id ? "visible" : "invisible"
                  }`}
                ></div>
                <div
                  style={{ top: "0", left: "0", zIndex: 1000, borderRight:"1px dashed #8e9fd7", height:"100%" }}
                  className={`absolute ${
                    selectedBlockId == item.id ? "visible" : "invisible"
                  }`}
                ></div>
              </div>
            )
          );
        })}
      </>
    );
  }
;
