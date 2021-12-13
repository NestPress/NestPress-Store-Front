import { useBlocks } from "store/blocksStore";
import { Page, Pages, Layouts, Settings, Users, MainTabs } from "components/blocks";

export const MainPanel: React.FC = () => {
  const composerTab = useBlocks((state) => state.composerTab);
  return (
    <div className="h-screen">
      <MainTabs/>
      {composerTab === "page" && <Page />}
      {composerTab === "pages" && <Pages />}
      {composerTab === "users" && <Users />}
      {composerTab === "layouts" && <Layouts />}
      {composerTab === "settings" && <Settings />}      
    </div>
  );
};
