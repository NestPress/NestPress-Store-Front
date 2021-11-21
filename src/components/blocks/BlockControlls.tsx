/* TODO fix type */
// @ts-ignore
// @ts-nocheck

import { FiCornerRightDown, FiArrowDown, FiExternalLink } from "react-icons/fi";
import { BlocksHeader } from "components/blocks";
import { useBlocks } from "store/blocksStore";
import { TextareaField, BackgroundColor, NumberField, FontSize, TextColor } from "components/blocks/blockControlls"
export const BlockControlls: React.FC = () => {
  const blocks = useBlocks((state) => state.blocks);
  const block = () => blocks.find((x) => x.id === selectedBlockId);
  const selectedBlockId = useBlocks((state) => state.selectedBlockId);
  const setBlockAttrs = useBlocks((state) => state.setBlockAttrs);
  const replace = useBlocks((state) => state.replace);
  const removeBlock = useBlocks((state) => state.removeBlock);

  const buttonClass =
    "flex items-center bg-blue-400 w-full p-2 rounded mt-1 text-white hover:bg-blue-500";

  return (
    <>
      <BlocksHeader />
      <div className="grid grid-cols-4 text-xs gap-1 p-2">
        <div className="py-1">ID</div>
        <div className="col-span-3 bg-gray-100 p-1 border">
          {block()?.id || ""}
        </div>
        <div className="py-1">Block</div>
        <div className="col-span-3 bg-gray-100 p-1 border">
          {block()?.block || ""}
        </div>
        <div className="py-1">ParentID</div>
        <div className="col-span-3 bg-gray-100 p-1 border">
          {block()?.parentId || ""}
        </div>
        {Object.keys(block()?.attrs || {}).map((key, index) => {
          return !replace ? (
            <>
              <div key={index} className="py-1">
                {key}
              </div>

              {(key === "columns" ||
                key === "colspan" ||
                key === "rowspan" ||
                key === "rows") && (
                <NumberField keyName={key}/>
              )}

              {(key === "text" || key === "mutation") && (
                <TextareaField keyName={key}/>
              )}

              {key === "background" && (
                <BackgroundColor keyName={key}/>
              )}

              {key === "fontsize" && (
                <FontSize keyName={key}/>
              )}

              {key === "textcolor" && (
                <TextColor keyName={key}/>
              )}

              

              {key !== "text" &&
                key !== "mutation" &&
                key !== "columns" &&
                key !== "colspan" &&
                key !== "rowspan" &&
                key !== "rows" &&
                key !== "fontsize" &&
                key !== "textcolor" &&
                key !== "background" && (
                  <input
                    onChange={(e) =>
                      setBlockAttrs({ key: key, value: e.target.value })
                    }
                    className="col-span-3 border p-1"
                    value={block()?.attrs[key]}
                  />
                )}
            </>
          ) : null;
        })}
      </div>

      {!replace ? (
        <div className="px-2 border-t pt-1">
          <button
            className={buttonClass}
            onClick={(e) => useBlocks.setState({ panel: "insertChild" })}
          >
            <FiCornerRightDown />
            <span className="ml-2">Insert child block</span>
          </button>
          <button
            className={buttonClass}
            onClick={(e) => useBlocks.setState({ panel: "insertNext" })}
          >
            <FiArrowDown />
            <span className="ml-2">Insert next block</span>
          </button>
          <button
            className={buttonClass}
            onClick={(e) => useBlocks.setState({ replace: true })}
          >
            <FiExternalLink />
            <span className="ml-2">Move inside another block</span>
          </button>
          <button
            className={buttonClass}
            onClick={(e) => {
              useBlocks.setState({ panel: "mainPanel" });
              removeBlock();
            }}
          >
            <FiExternalLink />
            <span className="ml-2">Remove block</span>
          </button>
        </div>
      ) : (
        <div className="text-xs p-2 border-t border-b bg-yellow-100">
          Select parent block to replace
        </div>
      )}
    </>
  );
};
