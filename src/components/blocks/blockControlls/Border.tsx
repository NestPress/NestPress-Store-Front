import { useBlocks } from "store/blocksStore";
interface Props {
  keyName: string;
}
export const Border: React.FC<Props> = ({ keyName }) => {
  const blocks = useBlocks((state) => state.blocks);
  const block = () => blocks.find((x) => x.id === selectedBlockId);
  const setBlockAttrs = useBlocks((state) => state.setBlockAttrs);
  const selectedBlockId = useBlocks((state) => state.selectedBlockId);
  return (
    <select
      className="col-span-3 border bg-white p-2"
      onChange={(e) =>
        setBlockAttrs({ key: keyName, value: e.target.value })
      }
    >
      <option selected={block()?.attrs[keyName] === ""} 
        value="main-text"
      >
        Empty definition
      </option>

      <option
        selected={block()?.attrs[keyName] === "border"}
        value="border"
      >
        Border
      </option>

      <option
        selected={block()?.attrs[keyName] === "border-r"}
        value="border-r"
      >
        Border right
      </option>

      <option selected={block()?.attrs[keyName] === "border-b"} 
        value="border-b"
      >
        Border bottom
      </option>

      <option selected={block()?.attrs[keyName] === "border-l"} 
        value="border-l"
      >
        Border left
      </option>

      <option selected={block()?.attrs[keyName] === "border-r"} 
        value="border-r"
      >
        Border right
      </option>

      <option selected={block()?.attrs[keyName] === "border-t"} 
        value="border-t"
      >
        Border top
      </option>
      
      
    </select>
  );
};
