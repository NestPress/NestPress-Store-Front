import { FiClipboard, FiList, FiHash, FiSave } from "react-icons/fi";
import { useBlocks } from "store/blocksStore";
interface Props {
  type: string;
}
export const FormBlocks: React.FC = ({type}) => {
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
            block: "form/Form",
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
