import { FiLink, FiLogOut } from "react-icons/fi";
import { useStickyState, setItemToStorage} from "helpers/localMockupApi"
import { uid } from 'components/blocks/helpers/blocks'
import { useRouter } from "next/router";
import { useBlocks } from "store/blocksStore";
interface Props {
  type: string;
}
export const NavBlocks: React.FC = ({type}) => {
  
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
    addBlock(block);
    /* Data loader localstorage */
    setItemToStorage(block, storageBlocks, setStorageBlocks, 'id')
  }

  return (
    <div className="px-2">
      <button
        className={buttonClass}
        onClick={(e) =>
          addBlock({
            ...prefix,
            block: "nav/NavLink",
            post: slugPath[0],
            attrs: {
              title: "Example link",
              to: "/",
              asButton: false,
            },
          })
        }
      >
        <FiLink/><span className="ml-2">Navigation link</span>
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          addBlock({
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
        <FiLink/><span className="ml-2">Navigation button</span>
        
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          addBlock({
            ...prefix,
            block: "form/SubmitButton",
            post: slugPath[0],
            attrs: {
              text: "Submit button",
              color: "dark-text",
            },
          })
        }
      >
        <FiLogOut/><span className="ml-2">Logout link</span>
      </button>
    </div>
  );
};
