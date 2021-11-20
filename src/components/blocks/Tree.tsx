import dynamic from 'next/dynamic'

// EDITABLE
import { useBlocks } from 'store/blocksStore'
// !EDITABLE

export const Tree: React.FC<Props> = ({ blocks, parentId = 0, level = 0, editable }: TreeProps) => {
  
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
          className={`border border-l-4 p-2 m-1 cursor-pointer hover:border-pink-500 hover:border-opacity-50 ${selectedBlockId == item.id ? 'border-blue-300' : null}`} 
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
        </div>
      )})}
    </>
  );
}