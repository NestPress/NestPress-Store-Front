/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { FiSettings, FiSave, FiLogIn, FiLogOut } from "react-icons/fi";
import { useRouter } from "next/router";
import { usePage } from "store/pageStore";
import { Upload } from "components/blocks"
import { useApp } from "store";
import { downloadObjectAsJson } from "components/blocks/helpers/blocks";

export const Settings: React.FC = () => {
  const router = useRouter()
  const slugPath = router.query?.slugPath || ["Page", "home"];
  const buttonClass =
    " bg-blue-400 w-full p-2 rounded mt-1 text-white hover:bg-blue-500 flex items-center";
  const buttonDeleteClass =
    " bg-red-400 w-full p-2 rounded mt-1 text-white hover:bg-red-500";

  const blocks = useApp((state) => state.display.blocks) || [];

 
  return (
    
      <div>
        <div className="p-2 flex items-center bg-pink-600 text-white">  
          <FiSettings />
          <span className="ml-2">Settings</span>
        </div>

        <div className="text-xs px-4 py-2 border-b bg-yellow-100">
          Message
        </div>


        {/*<div className="px-2 mt-2">
          <label className="inline-flex items-center">
            <input type="radio" className="form-radio" name="accountType" value="personal"/>
            <span className="ml-2">Single page</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input type="radio" className="form-radio" name="accountType" value="busines"/>
            <span className="ml-2">Business</span>
          </label>
        </div>*/}
      <div className="mx-2 mt-2">
        <select className="form-select mt-1 block w-full border py-2 bg-white text-xs">
          <option>This page</option>
          <option>Pages</option>
          <option>Layouts</option>
        </select>
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
