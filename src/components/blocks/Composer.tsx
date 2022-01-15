import { useBlocks, useApp } from "store";
import { BlockControlls, InsertBlock, MainPanel } from "components/blocks";

export const Composer: React.FC = () => {
  const panel = useBlocks((state) => state.panel);
  const targeter = useApp((state) => state.custom.activeTargeter);
  
  return (
    <div style={{background:'#fafafa'}} className="fixed h-screen shadow border-l border-gray-300 top-0 right-0 w-80 bg-white ">
      {panel == "mainPanel" && <MainPanel />}

      {panel == "insertChild" && <InsertBlock type="child" />}

      {panel == "insertNext" && <InsertBlock type="next" />}

      {panel == "block" && <BlockControlls />}
    </div>
  );
};
