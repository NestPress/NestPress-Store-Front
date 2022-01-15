/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { useRouter, useHistory } from "next/router"; 
import { FiEdit } from "react-icons/fi";
import { useApp, getFromStore, setToStore } from "store";

export const BottomBar: React.FC = () => {
  const router = useRouter()
  const r = getFromStore({store:"router",ref:"slugPath"})
  
  return (
    <div style={{zIndex:2000}} className="sticky border-t bottom-0 w-full bg-pink-500 text-white flex items-center">
      <div className="p-2 border-r ">NP NestPress</div>    
      <div
        onClick={e=>{
          setToStore({store:"custom",ref:`activeTargeter`, data:true})
          router.push(['composer',...r].join('/'))
        }} 
        className="p-3 border-r underline text-xs cursor-pointer flex items-center gap-1">
        <FiEdit/>Open {r[1]} {r[0]} with composer
      </div>    
    </div>
  );
};
