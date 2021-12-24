import { FiFileText, FiList, FiLayout, FiSettings, FiUsers, FiDatabase, FiGrid } from "react-icons/fi";
import { useBlocks } from "store/blocksStore";


export const MainTabs: React.FC = () => {
  const composerTab = useBlocks((state) => state.composerTab);
  const message = useBlocks((state) => state.message);
  return (
      <div className="flex border-t border-b text-xl text-gray-500 select-none">
        <div
          onClick={(e) => {
            useBlocks.setState({ composerTab: "page", selectedBlockId: null, message: '', blocksPocket:false, panel:'mainPanel' }) 
          }}
          className={`p-3 flex-1 border-r text-center 
            ${composerTab === "page" ? "bg-gray-100 text-gray-800" : "cursor-pointer"}`}
        >
          <FiFileText/> <div className="hidden">Page</div>
        </div>
        <div
          onClick={(e) => {
            useBlocks.setState({ composerTab: "pages", selectedBlockId: null, message: '', blocksPocket:false, panel:'mainPanel' }) 
          }}
          className={`p-3 flex-1 border-r text-center 
            ${composerTab === "pages" ? "bg-gray-100 text-gray-800" : "cursor-pointer"}`}
        >
          <FiList/> <div className="hidden">Pages</div>
        </div>
        <div
          onClick={(e) => {
            useBlocks.setState({ composerTab: "reusable", selectedBlockId: null, message: '', blocksPocket:false, panel:'mainPanel' }) 
          }}
          className={`p-3 flex-1 border-r text-center 
            ${composerTab === "reusable" ? "bg-gray-100 text-gray-800" : "cursor-pointer"}`}
        >
          <FiGrid/> <div className="hidden">Reusable</div>
        </div>
        <div
          onClick={(e) => {
            useBlocks.setState({ composerTab: "users", selectedBlockId: null, message: '', blocksPocket:false, panel:'mainPanel' }) 
          }}
          className={`p-3 flex-1 border-r text-center 
            ${composerTab === "users" ? "bg-gray-100 text-gray-800" : "cursor-pointer"}`}
        >
          <FiUsers/> <div className="hidden">Users</div>
        </div>
        <div
          onClick={(e) => {
            useBlocks.setState({ composerTab: "data", selectedBlockId: null, message: '', blocksPocket:false, panel:'mainPanel' }) 
          }}
          className={`p-3 flex-1 border-r text-center 
            ${composerTab === "data" ? "bg-gray-100 text-gray-800" : "cursor-pointer"}`}
        >
          <FiDatabase/> <div className="hidden">Data</div>
        </div>
        <div
          onClick={(e) => {
            useBlocks.setState({ composerTab: "settings", selectedBlockId: null, message: '', blocksPocket:false, panel:'mainPanel' }) 
          }}
          className={`p-3 flex-1 border-r text-center 
            ${composerTab === "settings" ? "bg-gray-100 text-gray-800" : "cursor-pointer"}`}
        >
          <FiSettings/> <div className="hidden">Settings</div>
        </div>
      </div>
  );
};



  