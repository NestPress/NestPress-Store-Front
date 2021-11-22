
import { FiGrid, FiType, FiImage, FiMonitor } from "react-icons/fi";
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
    "text-sm bg-blue-400 w-full p-2 rounded mt-1 text-white hover:bg-blue-500 flex items-center";  
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
              border: "",
            },
          })
        }
      >
        <FiGrid/><span className="ml-2">Grid</span>
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
        <FiType/><span className="ml-2">Title</span>
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
        <FiType/><span className="ml-2">Paragraph</span>
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
        <FiImage/><span className="ml-2">Image</span>
      </button>

   

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
        <FiMonitor/><span className="ml-2">Breakpoints</span>
      </button>
    </div>
  );
};
