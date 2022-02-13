/* TODO fix type */
// @ts-ignore
// @ts-nocheck
// https://docs.jsonata.org/simple
import dynamic from "next/dynamic";
import { memo } from "react";
import { useKeys, getKey } from "store";
export const TestMapper: React.FC<Props> = memo(
  ({ 
    blocks,
    app,
    components,
    parentId, 
    level = 0, 
  }: TreeProps) => {

    const items = blocks.filter((el) => el?.parentId === parentId);
    if (!items.length) return null;
    const keys = useKeys((state) => state.keys);
    const updateKey = useKeys((state) => state.updateKey);
    
    // const resetKey = useKeys((state) => state.resetKey);
    return (
      <>
        {items.map((el, i) => {
          if(!app._components[el?.block]){
            app._components[el.block] = dynamic(() => import(`components/${el.block}`))
          } 
          const Block = app._components[el?.block] ? app._components[el.block] : <></>;
          return (
            app._components[el.block] && (
              <Block
                attrs={{
                  id: el.id,
                  // index: i,
                  ...keys[el.id]?.attrs
                }}
                key={keys[el.id].key}
                level={level}
              >
                <div className="border border-red-500 select-none hover:bg-red-200" onClick={e=>{
                  updateKey({id:el.id,path:'attrs.text',data:'jololo'})
                  //blocks[i].attrs.classes = `border p-2 bg-blue-${Math.floor(Math.random() * 9)}00`
                  // resetKey(i)
                }}> click: {i}</div>
                <TestMapper
                  blocks={blocks}
                  app={app}
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
