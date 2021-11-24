import { FiCornerRightDown, FiArrowDown } from "react-icons/fi";
import { BlocksHeader } from "components/blocks";
import { DataBlocks, FormBlocks, LayoutBlocks, NavBlocks } from "components/blocks/insertBlocks";
import { useBlocks } from "store/blocksStore";

interface Props {
  type: string;
}
export const InsertBlock: React.FC<Props> = ({ type }) => {
  const insertBlocksType = useBlocks((state) => state.insertBlocksType);
  return (
    <>
      <BlocksHeader />
      <div className="p-2">
        {type === "child" && <FiCornerRightDown />}
        {type === "next" && <FiArrowDown />}
        Insert {type} block
      </div>
      <div className="flex border-t border-b mb-2 text-xs">
        <div
          onClick={(e) => useBlocks.setState({ insertBlocksType: "layout" })}
          className={`p-3 flex-1 border-r text-center 
            ${
              insertBlocksType === "layout" ? "bg-gray-100" : "cursor-pointer"
            }`}
        >
          Layout
        </div>
        <div
          onClick={(e) => useBlocks.setState({ insertBlocksType: "nav" })}
          className={`p-3 flex-1 border-r text-center 
            ${insertBlocksType === "nav" ? "bg-gray-100" : "cursor-pointer"}`}
        >
          Nav
        </div>
        <div
          onClick={(e) => useBlocks.setState({ insertBlocksType: "form" })}
          className={`p-3 flex-1 border-r text-center 
            ${insertBlocksType === "form" ? "bg-gray-100" : "cursor-pointer"}`}
        >
          Form
        </div>
        <div
          onClick={(e) => useBlocks.setState({ insertBlocksType: "data" })}
          className={`p-3 flex-1 text-center 
            ${insertBlocksType === "data" ? "bg-gray-100" : "cursor-pointer"}`}
        >
          Data
        </div>
      </div>
      {insertBlocksType === "layout" && (
        <LayoutBlocks type={type}/>
      )}

      {insertBlocksType === "form" && (
        <FormBlocks type={type}/>
      )}

      {insertBlocksType === "nav" && (
        <NavBlocks type={type}/>
      )}

      {insertBlocksType === "data" && (
        <DataBlocks type={type}/>
      )}
    </>
  );
};
