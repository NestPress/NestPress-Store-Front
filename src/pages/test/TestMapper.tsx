/* TODO fix type */
// @ts-ignore
// @ts-nocheck

import dynamic from "next/dynamic";
import { useState, memo } from "react";
import { jsonata } from "jsonata"
import { useApp } from "store";
import { targetingAndIndexingBlocks } from "helpers";

export const TestMapper: React.FC<Props> = memo(
  ({ 
    app,
    components,
    parentId, 
    level = 0, 
  }: TreeProps) => {
    const items = app._blocks.filter((el) => el?.parentId === parentId);
    if (!items.length) return null;
    return (
      <>
        {items.map((el, i) => {
          if(!components[el?.block]){
            components[el.block] = dynamic(() => import(`components/${el.block}`))
          } 
          const Block = components[el?.block] ? components[el.block] : <></>;
          const [key, setKey] = useState(el.id);
          return (
            components[el.block] && (
              <Block
                attrs={{
                  id: el.id,
                  index: i,
                  ...el.attrs,
                }}
                key={key}
                level={level}
              >
                <div className="border border-red-500 select-none hover:bg-red-200" onClick={e=>{
                  app._blocks[i+1].attrs.classes = `border p-2 bg-blue-${Math.floor(Math.random() * 9)}00`
                  setKey(Math.floor(Math.random() * 999))
                }}> click </div>
                <TestMapper
                  app={app}
                  components={components}
                  parentId={el.id}
                  level={level + 1}
                />
              </Block>
            )
          )
        })}
      </>
    )
  }
)
