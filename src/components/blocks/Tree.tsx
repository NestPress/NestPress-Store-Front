import dynamic from 'next/dynamic'
import { memo } from 'react'
// EDITABLE
import { useBlocks } from 'store/blocksStore'
// !EDITABLE

export const Tree: React.FC<Props> = memo(({ blocks, parentId = 0, level = 0, editable }: TreeProps) => {
  const preview = useBlocks((state) => state.preview);
  const items = blocks
    .filter((item) => item.parentId === parentId)
    // .sort((a, b) => (a.text > b.text ? 1 : -1)); - change sort
  if (!items.length) return null;
  
  // EDITABLE
  const setBlock = useBlocks((state) => state.setBlock);
  const selectedBlockId = useBlocks((state) => state.selectedBlockId);
  // !EDITABLE
  
  return (
    <>
      {items.map((item) => {
        const Block = item.block && dynamic(() => import(`components/${item.block}`))
        return item.block && (
        
        // EDITABLE
       
        <div 
          style={{minHeight:'30px'}} 
          className={`
            ${!preview  ? 'p-2 border-l-gray-300 border-gray-200 cursor-pointer border-l-4  m-1' : null}
            ${ item?.attrs?.colspan ? 'col-span-'+item.attrs.colspan :null}
            ${ item?.attrs?.rowspan ? 'row-span-'+item.attrs.rowspan :null}
            relative  
            border
            border-white
            hover:border-pink-500 
            hover:border-opacity-50 
            ${selectedBlockId == item.id ? 'border-blue-300' : null}`} 
          key={`block-${item.id}`} 
          onClick={(e)=>{
            e.stopPropagation();
            setBlock(item.id); 
            useBlocks.setState({panel:'block'});
          }}
        >
        
          <Block attrs={item.attrs} key={item.id} item={item} level={level}>
            <Tree blocks={blocks} parentId={item.id} level={level + 1} item={item}/>
          </Block>
          <div style={{bottom:"-20px", right:"-1px", zIndex:1000}} className={`absolute text-xs text-white bg-blue-300 p-0.5 ${selectedBlockId == item.id ? 'visible' : 'invisible'}`}>{item.block}</div>
        </div>
      )})}
    </>
  );
})