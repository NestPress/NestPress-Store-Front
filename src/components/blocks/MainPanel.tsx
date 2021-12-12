import { FiFileText, FiList, FiLayout, FiSettings, FiUsers } from "react-icons/fi";
import { useBlocks } from "store/blocksStore";
import { Page, Pages, Layouts, Settings, Users } from "components/blocks";

export const MainPanel: React.FC = () => {
  const composerTab = useBlocks((state) => state.composerTab);
  const message = useBlocks((state) => state.message);
  return (
    <div className="h-screen">
      <div className="flex border-t border-b text-xl text-gray-500 select-none">
        <div
          onClick={(e) => {
            useBlocks.setState({ composerTab: "page" }) 
            useBlocks.setState({ message: ''});
          }}
          className={`p-3 flex-1 border-r text-center 
            ${composerTab === "page" ? "bg-gray-100 text-gray-800" : "cursor-pointer"}`}
        >
          <FiFileText/> <div className="hidden">Page</div>
        </div>
        <div
          onClick={(e) => {
            useBlocks.setState({ composerTab: "pages" })
            useBlocks.setState({ message: ''});
          }}
          className={`p-3 flex-1 border-r text-center 
            ${composerTab === "pages" ? "bg-gray-100 text-gray-800" : "cursor-pointer"}`}
        >
          <FiList/> <div className="hidden">Pages</div>
        </div>
        <div
          onClick={(e) => useBlocks.setState({ composerTab: "layouts" })}
          className={`p-3 flex-1 border-r text-center 
            ${composerTab === "layouts" ? "bg-gray-100 text-gray-800" : "cursor-pointer"}`}
        >
          <FiLayout/> <div className="hidden">layouts</div>
        </div>
        <div
          onClick={(e) => useBlocks.setState({ composerTab: "users" })}
          className={`p-3 flex-1 border-r text-center 
            ${composerTab === "users" ? "bg-gray-100 text-gray-800" : "cursor-pointer"}`}
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
      {composerTab === "users" && <Users />}
      {composerTab === "layouts" && <Layouts />}
      {composerTab === "settings" && <Settings />}      
    </div>
  );
};
