/* TODO fix type */
// @ts-ignore
// @ts-nocheck

import dynamic from "next/dynamic";
import { memo } from "react";
import { useApp, getFromStore } from "store";
import { Targeter } from "components/nestpress/Targeter"

/* TODO fix type */
// @ts-ignore: Unreachable code error
export const EditMapper: React.FC<Props> = memo(
  ({ blocks, parentId = 0, level = 0}: TreeProps) => {
    const items = blocks.filter((el) => el.parentId === parentId);
    if (!items.length) return null;
    
    const components = useApp((state) => state.components);
    const setData = useApp((state) => state.setData);
    const targeter = getFromStore({store:"custom", ref:"activeTargeter"})

    return (
      <>
        {items.map((el) => { 
          if(!components[el.block]){
              setData({
                store: 'components',
                ref: el.block,
                data: dynamic(() => import(`components/${el.block}`)),
              })
          }else{
            const Block: string = components[el.block];
          }
          return (
            components[el.block] && (
              <Block
                attrs={{ 
                  id: el.id, 
                  ...el.attrs 
                }}
                key={el.id}
                level={level}
              >
                <Targeter type="before" level={level} item={el} />
                  {el.attrs.handler && 
                    <div 
                      style={{background:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAALklEQVQYV2M0Njb+z8DAwJAWxs4wa9VPBkaQAIwDkmCc2Wn1HyQDA2AVMA5IJQB4EBAo8+rnBAAAAABJRU5ErkJggg==) repeat'}}
                      className="text-xs p-1 text-white">Handler {el.attrs.handler}</div>}
                <EditMapper
                  blocks={blocks}
                  parentId={el.id}
                  level={level + 1}
                />
                
              </Block>
            )
          );
        })}
      </>
    );
  }
);
