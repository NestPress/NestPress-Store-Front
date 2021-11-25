/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { FiSettings, FiLogIn, FiLogOut } from "react-icons/fi";
import { useRouter } from "next/router";
import { usePage } from "store/pageStore";
import { useStickyState, downloadObjectAsJson } from "helpers/localMockupApi"

export const Settings: React.FC = () => {
  const slugPath = useRouter().query?.slugPath || ["home"];
  const buttonClass =
    " bg-blue-400 w-full p-2 rounded mt-1 text-white hover:bg-blue-500 flex items-center";
  const buttonDeleteClass =
    " bg-red-400 w-full p-2 rounded mt-1 text-white hover:bg-red-500";

  /* Data loader localstorage */
  const [ storagePosts, setStoragePosts ] = useStickyState([], 'storagePosts');
 

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
          <button className={buttonClass}>
            <FiLogIn/> 
            <span className="ml-2">Import data</span>
          </button>
        </div>

        <div className="p-2 border-b">
          <button className={buttonClass} onClick={(e)=>downloadObjectAsJson({foo:'bar'},'NP-exported-homepage')}>
            <FiLogOut/>h
            <span className="ml-2">Export data</span>
          </button>
        </div>


      </div>
 
  );
};
