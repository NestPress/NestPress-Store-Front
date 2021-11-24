import { FiClipboard, FiList, FiHash, FiSave } from "react-icons/fi";
import { useStickyState, setItemToStorage} from "helpers/localMockupApi"
import { uid } from 'components/blocks/helpers/blocks'
import { useRouter } from "next/router";
import { useBlocks } from "store/blocksStore";
interface Props {
  type: string;
}

export const FormBlocks: React.FC = ({type}) => {
  
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
            block: "form/Form",
            post: slugPath[0],
            attrs: {
              mutation: "",
            },
          })
        }
      >
        <FiClipboard/><span className="ml-2">Form component</span>
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          addBlock({
            ...prefix,
            block: "form/InputField",
            post: slugPath[0],
            attrs: {
              label: "Example label",
              placeholder: "Example placeholder",
              outputValue: "data.value",
            },
          })
        }
      >
        <FiHash/><span className="ml-2">Input field</span>
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          addBlock({
            ...prefix,
            block: "form/TextareaField",
            post: slugPath[0],
            attrs: {
              rows: 6,
              label: "Example label",
              placeholder: "Example placeholder",
            },
          })
        }
      >
        <FiHash/><span className="ml-2">Textarea field</span>
        
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          addBlock({
            ...prefix,
            block: "form/SelectField",
            post: slugPath[0],
            attrs: {
              label: "Example label",
            },
          })
        }
      >
        <FiList/><span className="ml-2"> Select and search field</span>
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          addBlock({
            ...prefix,
            block: "form/SubmitButton",
            post: slugPath[0],
            attrs: {
              title: "Submit button",
              color: "dark-text",
            },
          })
        }
      >
        <FiSave/><span className="ml-2"> Submit button</span>
      </button>
    </div>
  );
};
