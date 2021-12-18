// import { useBlocks } from "store/blocksStore";
// import { BlockControlls, InsertBlock, MainPanel } from "components/blocks";
import { useBlocks } from "store/blocksStore";
import { FiGrid, FiType, FiClipboard ,FiSave, FiHash, FiDatabase } from "react-icons/fi";
 

export const BlocksPocket: React.FC = () => {
  const blocks = useBlocks((state) => state.blocks) || [];
  const selectedBlockId = useBlocks((state) => state.selectedBlockId);
  const itemClass = 'text-xs p-1.5 border-b hover:bg-gray-100 grid grid-cols-10 gap-1'

  return (
    <div className="fixed h-screen shadow border-r border-gray-300 top-0 left-0 w-60 bg-white cursor-pointer">
      <div className="p-2.5 text-gray-500 border-b">Flatten blocks list</div>
      {blocks.map(el => <div 
        onClick={e=>{
          useBlocks.setState({ selectedBlockId: el.id });
          useBlocks.setState({ panel: "block" });
        }} 
        className={`${itemClass} ${el.id === selectedBlockId ? 'bg-indigo-100' : null }`}>
          <div className="col-span-1 flex items-center">
            {el.block === 'layout/Grid' && <FiGrid/>}
            {(el.block === 'layout/Title' || el.block === 'layout/Paragraph') && <FiType/>}
            {el.block === 'form/Form' && <FiClipboard/>}
            {el.block === 'form/SubmitButton' && <FiSave/>}
            {el.block === 'form/InputField' && <FiHash/>}
            {el.block === 'data/QueryList' && <FiDatabase/>}

            
          </div>
          <div className="overflow-hidden col-span-5">{el.block}</div>
          <div className="overflow-hidden col-span-3">{el.post}</div>
          <div className="overflow-hidden col-span-1">{el.order}</div>
        </div>)}
    </div>
  );
};
