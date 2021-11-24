import { FiGrid, FiType, FiImage, FiMonitor } from "react-icons/fi";
import { useStickyState, setItemToStorage} from "helpers/localMockupApi"
import { uid } from 'components/blocks/helpers/blocks'
import { useRouter } from "next/router";
import { useBlocks } from "store/blocksStore";
interface Props {
  type: string;
}

export const LayoutBlocks: React.FC = ({type}) => {
  
  /* Data loader localstorage */
  const [ storageBlocks, setStorageBlocks ] = useStickyState([], 'storageBlocks');
  
  /* Zustand states */
  const selectedBlockId = useBlocks((state) => state.selectedBlockId);
  const blocks = useBlocks((state) => state.blocks);
  const block = () => blocks.find((x) => x.id === selectedBlockId);
  const addBlock = useBlocks((state) => state.addBlock);
  
  /* local consts */
  const slugPath = useRouter().query?.slugPath || ["home"];
  const prefix = {
    id: uid(),
    parentId: type === "next" ? block()?.parentId : block()?.id,
  };
  const buttonClass =
    "text-sm bg-blue-400 w-full p-2 rounded mt-1 text-white hover:bg-blue-500 flex items-center";  

  /* local methosd */
  const teachSetBlock = (block) => {
    /* Set to zustand state */
    addBlock(block);
    /* Data loader localstorage */
    setItemToStorage(block, storageBlocks, setStorageBlocks, 'id')
  }

  return (
    <div className="px-2">
      <button
        className={buttonClass}
        onClick={(e) =>
          teachSetBlock({
            ...prefix,
            block: "layout/Grid",
            post: slugPath[0],
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
          teachSetBlock({
            ...prefix,
            block: "layout/Title",
            post: slugPath[0],
            attrs: {
              text: "Example title",
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
          teachSetBlock({
            ...prefix,
            block: "layout/Paragraph",
            post: slugPath[0],
            attrs: {
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              colspan: 0,
              fontsize: '',
              textcolor: '',
            },
          })
        }
      >
        <FiType/><span className="ml-2">Paragraph</span>
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          teachSetBlock({
            ...prefix,
            block: "layout/Paragraph",
            post: slugPath[0],
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
          teachSetBlock({
            ...prefix,
            post: slugPath[0],
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
