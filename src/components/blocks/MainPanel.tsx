import { FiFileText, FiDatabase, FiLayout, FiSettings, FiUsers } from "react-icons/fi";
import { useBlocks } from "store/blocksStore";
import { Page, Pages, Settings } from "components/blocks";

export const MainPanel: React.FC = () => {
  const composerTab = useBlocks((state) => state.composerTab);
  return (
    <div className="h-screen">
      <div className="flex border-t border-b text-xl text-gray-500 select-none">
        <div
          onClick={(e) => useBlocks.setState({ composerTab: "page" })}
          className={`p-3 flex-1 border-r text-center 
            ${composerTab === "page" ? "bg-gray-100 text-gray-800" : "cursor-pointer"}`}
        >
          <FiFileText/> <div className="hidden">Page</div>
        </div>
        <div
          onClick={(e) => useBlocks.setState({ composerTab: "pages" })}
          className={`p-3 flex-1 border-r text-center 
            ${composerTab === "pages" ? "bg-gray-100 text-gray-800" : "cursor-pointer"}`}
        >
          <FiDatabase/> <div className="hidden">Pages</div>
        </div>
        <div
          onClick={(e) => useBlocks.setState({ composerTab: "layouts" })}
          className={`p-3 flex-1 border-r text-center 
            ${composerTab === "layouts" ? "bg-gray-100 text-gray-800" : "cursor-pointer"}`}
        >
          <FiLayout/> <div className="hidden">layouts</div>
        </div>
        <div
          onClick={(e) => useBlocks.setState({ composerTab: "settings" })}
          className={`p-3 flex-1 border-r text-center 
            ${composerTab === "settings" ? "bg-gray-100 text-gray-800" : "cursor-pointer"}`}
        >
          <FiUsers/> <div className="hidden">Users</div>
        </div>
        <div
          onClick={(e) => useBlocks.setState({ composerTab: "settings" })}
          className={`p-3 flex-1 border-r text-center 
            ${composerTab === "settings" ? "bg-gray-100 text-gray-800" : "cursor-pointer"}`}
        >
          <FiSettings/> <div className="hidden">Settings</div>
        </div>
      </div>

      {composerTab === "page" && <Page />}
      {composerTab === "pages" && <Pages />}
      {composerTab === "settings" && <Settings />}      
    </div>
  );
};
