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
    " bg-blue-400 w-full p-2 rounded mt-1 text-white hover:bg-blue-500";
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
        Form component
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
        Input field
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
        Textarea field
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
        Select and search field
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
        Submit button
      </button>
    </div>
  );
};
