import { useBlocks } from "store/blocksStore";
import { useRouter } from "next/router";

interface Props {
  type: string;
}
export const DataBlocks: React.FC = ({type}) => {

  const selectedBlockId = useBlocks((state) => state.selectedBlockId);
  const blocks = useBlocks((state) => state.blocks);
  const block = () => blocks.find((x) => x.id === selectedBlockId);
  const addBlock = useBlocks((state) => state.addBlock);

  
  const slugPath = useRouter().query?.slugPath || ["home"];
  const uid = () => new Date().getTime().toString(36);
  const prefix = {
    id: uid(),
    parentId: type === "next" ? block()?.parentId : block()?.id,
  };

  const teachSetBlock = (block) => {
    addBlock(block);
  }

  const buttonClass =
    " bg-blue-400 w-full p-2 rounded mt-1 text-white hover:bg-blue-500";
  return (
    <div className="px-2">
      <button
        className={buttonClass}
        onClick={(e) =>
          teachSetBlock({
            ...prefix,
            block: "form/Form",
            post: slugPath[0],
            attrs: {
              cols: 1,
            },
          })
        }
      >
        Query elements list
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          teachSetBlock({
            ...prefix,
            block: "form/InputField",
            post: slugPath[0],
            attrs: {
              text: "Example title",
              color: "dark-text",
            },
          })
        }
      >
        Query element
      </button>
    </div>
  );
};
