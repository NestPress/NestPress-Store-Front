import { useBlocks } from "store/blocksStore";
interface Props {
  type: string;
}
export const LayoutBlocks: React.FC = ({type}) => {
  const selectedBlockId = useBlocks((state) => state.selectedBlockId);
  const blocks = useBlocks((state) => state.blocks);
  const block = () => blocks.find((x) => x.id === selectedBlockId);
  const addBlock = useBlocks((state) => state.addBlock);
  const uid = () => new Date().getTime().toString(36);
  const prefix = {
    id: uid(),
    parentId: type === "next" ? block()?.parentId : block()?.id,
  };

  const buttonClass =
    " bg-blue-400 w-full p-2 rounded mt-1 text-white hover:bg-blue-500";  
  return (
    <div className="px-2">
      <button
        className={buttonClass}
        onClick={(e) =>
          addBlock({
            ...prefix,
            block: "layout/Grid",
            attrs: {
              columns: "",
              colspan: "",
              rowspan: "",
              background: "",
            },
          })
        }
      >
        Grid
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          addBlock({
            ...prefix,
            block: "layout/Title",
            attrs: {
              text: "Example title",
              color: "dark-text",
              colspan: 0,
              fontsize: '',
              textcolor: '',
            },
          })
        }
      >
        Title
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          addBlock({
            ...prefix,
            block: "layout/Paragraph",
            attrs: {
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              colspan: 0,
            },
          })
        }
      >
        Paragraph
      </button>

      <button className={buttonClass}>Image</button>

      <button
        className={buttonClass}
        onClick={(e) =>
          addBlock({
            ...prefix,
            block: "layout/Breakpoints",
            attrs: {},
          })
        }
      >
        Breakpoints
      </button>
    </div>
  );
};
