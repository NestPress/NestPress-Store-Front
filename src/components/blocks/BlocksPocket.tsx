// import { useBlocks } from "store/blocksStore";
// import { BlockControlls, InsertBlock, MainPanel } from "components/blocks";
import { useBlocks } from "store/blocksStore";

export const BlocksPocket: React.FC = () => {
  const blocks = useBlocks((state) => state.blocks) || [];
  const selectedBlockId = useBlocks((state) => state.selectedBlockId);
  const itemClass = 'text-xs p-1.5 border-b hover:bg-gray-100 grid grid-cols-3 gap-1'

  return (
    <div className="fixed h-screen shadow border-r border-gray-300 top-0 left-0 w-60 bg-white cursor-pointer">
      <div className="p-2.5 text-gray-500 border-b">Flatten blocks list</div>
      {blocks.map(el => <div 
        onClick={e=>{
          useBlocks.setState({ selectedBlockId: el.id });
          useBlocks.setState({ panel: "block" });
        }} 
        className={`${itemClass} ${el.id === selectedBlockId ? 'bg-indigo-100' : null }`}>
          <div className="overflow-hidden">{el.block}</div>
          <div className="overflow-hidden">{el.post}</div>
          <div className="overflow-hidden">{el.order}</div>
        </div>)}
    </div>
  );
};
