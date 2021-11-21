import { useBlocks } from "store/blocksStore";
interface Props {
  type: string;
}
export const NavBlocks: React.FC = ({type}) => {
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
            block: "nav/NavLink",
            attrs: {
              title: "Example link",
              to: "/",
              asButton: false,
            },
          })
        }
      >
        Navigation link
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          addBlock({
            ...prefix,
            block: "form/InputField",
            attrs: {
              text: "Example title",
              color: "dark-text",
            },
          })
        }
      >
        Navigation button
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          addBlock({
            ...prefix,
            block: "form/SubmitButton",
            attrs: {
              text: "Submit button",
              color: "dark-text",
            },
          })
        }
      >
        Logout link
      </button>
    </div>
  );
};
