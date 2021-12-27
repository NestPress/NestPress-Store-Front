/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { FiSettings, FiSave, FiLogIn, FiLogOut } from "react-icons/fi";
import { useRouter } from "next/router";
import { usePage } from "store/pageStore";
import { Upload } from "components/blocks"
import { useBlocks } from "store/blocksStore";
import { downloadObjectAsJson } from "helpers/io";

export const Settings: React.FC = () => {
  const router = useRouter()
  const slugPath = router.query?.slugPath || ["Page", "home"];
  const buttonClass =
    " bg-blue-400 w-full p-2 rounded mt-1 text-white hover:bg-blue-500 flex items-center";
  const buttonDeleteClass =
    " bg-red-400 w-full p-2 rounded mt-1 text-white hover:bg-red-500";

  const blocks = useBlocks((state) => state.blocks) || [];

 
  return (
    
      <div>
        <div className="p-2 flex items-center bg-pink-600 text-white">  
          <FiSettings />
          <span className="ml-2">Settings</span>
        </div>

        <div className="text-xs px-4 py-2 border-b bg-yellow-100">
          Message
        </div>

       

        <div className="p-2 border-b">
          <button className={buttonClass} 
            onClick={(e)=>downloadObjectAsJson({
              slug:slugPath[1],
              postType:slugPath[0],
              blocks:blocks
            },`NP-export-${slugPath[0]}-${slugPath[1]}`)}>
            <FiSave/>
            <span className="ml-2">Export data</span>
          </button>
        </div>

        <Upload res={(content,file)=>{
          if(content){
            const res = JSON.parse(content);
            router.push(`/composer/${res['postType']}/${res['slug']}`)
            console.log(JSON.parse(content),file)
          }else{
            alert('select file')
          }
        }}/>

      </div>
 
  );
};
