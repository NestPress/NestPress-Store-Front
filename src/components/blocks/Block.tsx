 import { FiCornerRightDown, FiArrowDown } from "react-icons/fi";
 import { BlocksHeader} from 'components/blocks'
 import { useBlocks } from 'store/blocksStore'
 export const Block: React.FC = () => {
  
  const blocks = useBlocks((state) => state.blocks);
  const block = () =>  blocks.find(x => x.id === selectedBlockId);
  const selectedBlockId = useBlocks((state) => state.selectedBlockId);
  const setBlockAttrs = useBlocks((state) => state.setBlockAttrs);

  const buttonClass = "flex items-center bg-blue-400 w-full p-2 rounded mt-1 text-white hover:bg-blue-500"

  
  return <>
    <BlocksHeader/> 
    <div className="grid grid-cols-4 text-xs gap-1 p-2">
      <div className="py-1">ID</div>
      <div className="col-span-3 bg-gray-100 p-1 border">{block().id}</div>
      <div className="py-1">Block</div>
      <div className="col-span-3 bg-gray-100 p-1 border">{block().block}</div>
      <div className="py-1">ParentID</div>
      <div className="col-span-3 bg-gray-100 p-1 border">{block().parentId}</div>
      {
        Object.keys(block().attrs).map((key, index) => {
          return (
            <>
              <div className="py-1">{key}</div>
              { key==='text' && 
                <textarea 
                  onChange={(e)=>setBlockAttrs({key:key,value:e.target.value})}  
                  rows="3" 
                  className="col-span-3 border p-1" value={block().attrs[key]}/>
              }

              { key==='cols' && 
                <input 
                  type="number"
                  onChange={(e)=>setBlockAttrs({key:key,value:e.target.value})}  
                  className="col-span-3 border p-1" value={block().attrs[key]}/>
              }

              { (key!=='text' && key!=='cols') && 
                <input 
                  onChange={(e)=>setBlockAttrs({key:key,value:e.target.value})}  
                  className="col-span-3 border p-1" value={block().attrs[key]}/>
              }
            </>
          )
        })
      }
    </div>
    <div className="px-2 border-t pt-1">
      <button className={buttonClass} 
        onClick={(e)=>useBlocks.setState({panel:'insertChild'})}>
          <FiCornerRightDown/>
          <span className="ml-2">Insert child block</span>
        </button>
      <button className={buttonClass} 
        onClick={(e)=>useBlocks.setState({panel:'insertNext'})}>
        <FiArrowDown/>
        <span className="ml-2">Insert next block</span>
      </button>
    </div>
  </>
}