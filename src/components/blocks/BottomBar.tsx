/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { useRouter, useHistory } from "next/router"; 
import { FiEdit } from "react-icons/fi";
import { useBlocks } from "store/blocksStore";

export const BottomBar: React.FC = () => {
  const router = useRouter()
  const slugPath = router.query?.slugPath || ["Page", "home"];
  return (
    <div className="sticky border-t bottom-0 w-full bg-pink-500 text-white flex items-center">
      <div className="p-2 border-r ">NP NestPress</div>    
      <div
        onClick={e=>{
          useBlocks.setState({ preview: false });
          router.push(['composer',...slugPath].join('/'))
        }} 
        className="p-3 border-r underline text-xs cursor-pointer flex items-center gap-1">
        <FiEdit/>Open {slugPath[1]} {slugPath[0]} with composer
      </div>    
    </div>
  );
};
