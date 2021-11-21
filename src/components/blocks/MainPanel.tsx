import { useBlocks } from "store/blocksStore";
import { Page, Pages } from "components/blocks";

export const MainPanel: React.FC = () => {
  const composerTab = useBlocks((state) => state.composerTab);
  return (
    <div className="h-screen">
      <div className="flex border-t border-b text-xs select-none">
        <div
          onClick={(e) => useBlocks.setState({ composerTab: "page" })}
          className={`p-3 flex-1 border-r text-center 
            ${composerTab === "page" ? "bg-gray-100" : "cursor-pointer"}`}
        >
          Page
        </div>
        <div
          onClick={(e) => useBlocks.setState({ composerTab: "pages" })}
          className={`p-3 flex-1 border-r text-center 
            ${composerTab === "pages" ? "bg-gray-100" : "cursor-pointer"}`}
        >
          Pages
        </div>
        <div
          onClick={(e) => useBlocks.setState({ composerTab: "layouts" })}
          className={`p-3 flex-1 border-r text-center 
            ${composerTab === "layouts" ? "bg-gray-100" : "cursor-pointer"}`}
        >
          Layouts
        </div>
      </div>

      {composerTab === "page" && <Page />}
      {composerTab === "pages" && <Pages />}
    </div>
  );
};
