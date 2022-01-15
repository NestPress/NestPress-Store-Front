import { useBlocks } from "store/blocksStore";
import { Page, Pages, Reusable, Settings, Users, MainTabs, Data, KeyCopy } from "components/blocks";

export const MainPanel: React.FC = () => {
  const composerTab = useBlocks((state) => state.composerTab);
  return (
    <div className="h-screen overflow-y-scroll">
      <MainTabs/>
      {composerTab === "page" && <Page />}
      {composerTab === "pages" && <Pages />}
      {composerTab === "users" && <Users />}
      {composerTab === "reusable" && <Reusable />}
      {composerTab === "data" && <Data />}
      {composerTab === "settings" && <Settings />}  
      {composerTab === "keyCopy" && <KeyCopy />}      
    </div>
  );
};
