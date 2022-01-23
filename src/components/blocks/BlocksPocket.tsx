/* TODO fix type */
// @ts-ignore
// @ts-nocheck
// import { useBlocks } from "store/blocksStore";
// import { BlockControlls, InsertBlock, MainPanel } from "components/blocks";
import { useBlocks, useApp, setToStore, getFromStore} from "store";
import { FiGrid, FiType, FiClipboard ,FiSave, FiHash, FiDatabase, FiLink, FiImage } from "react-icons/fi";
 import { useRouter } from "next/router";

export const BlocksPocket: React.FC = () => {
  const targeter = useApp((state) => state.custom.activeTargeter);
   const router = useRouter();
  const slugPath = router.query?.slugPath || ["Page","home"];
  const blocks = useApp((state) => state.display.blocks) || [];
  const itemClass = 'text-xs p-1.5 border-b hover:bg-green-50 grid grid-cols-10 gap-1'

  return (
    <div className="fixed overflow-y-scroll h-screen shadow border-r border-gray-300 top-0 left-0 w-72 bg-white cursor-pointer">

      <div className="p-2.5 text-gray-500 border-b">Flatten blocks list</div>
      <div className="text-gray-500 border-b flex text-xs">
        <div className="flex-1 text-center p-2.5 border-r border-t bg-gray-50">Blocks</div>
        <div className="flex-1 text-center p-2.5">Pages</div>
      </div>
      {blocks.map(el => el.post == slugPath[1] && <div 
        onClick={e=>{
          useBlocks.setState({ panel: "block" });

          setToStore({store:"custom", ref:`activeTargeter`, data:el})
        
          //console.log( el, getFromStore({store:"custom", ref:"activeTargeter"}))
          router.push(`/composer/${slugPath.join('/')}#${el.id}`)
        }} 
        className={`${itemClass} ${el.id === targeter.id ? 'bg-indigo-50' : null }`}>
          <div className="col-span-1 flex items-center">
            {el.block === 'layout/Grid' && <FiGrid/>}
            {(el.block === 'layout/Title' || el.block === 'layout/Paragraph') && <FiType/>}
            {el.block === 'form/Form' && <FiClipboard/>}
            {el.block === 'form/SubmitButton' && <FiSave/>}
            {el.block === 'form/InputField' && <FiHash/>}
            {el.block === 'data/QueryList' && <FiDatabase/>}
            {el.block === 'nav/NavLink' && <FiLink/>}
            {el.block === 'layout/Img' && <FiImage/>}

            
          </div>
          <div className="overflow-hidden col-span-5">{el.block}</div>
          <div className="overflow-hidden col-span-3">{el.post}</div>
          <div className="overflow-hidden col-span-1">{el.order}</div>
        </div>)}
    </div>
  );
};
