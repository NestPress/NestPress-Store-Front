import { useBlocks } from "store/blocksStore";
interface Props {
  keyName: string;
}
export const TextColor: React.FC<Props> = ({ keyName }) => {
  const blocks = useBlocks((state) => state.blocks);
  const block = () => blocks.find((x) => x.id === selectedBlockId);
  const setBlockAttrs = useBlocks((state) => state.setBlockAttrs);
  const selectedBlockId = useBlocks((state) => state.selectedBlockId);
  return (
    <select
      className="col-span-3 border bg-white"
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
        selected={block()?.attrs[keyName] === "light-text"}
        value="light-text"
      >
        Dark
      </option>
      <option
        selected={block()?.attrs[keyName] === "dark-text"}
        value="dark-text"
      >
        Lignt
      </option>
      <option selected={block()?.attrs[keyName] === "main-text"} 
        value="main-text"
      >
        Main
      </option>
      <option
        selected={block()?.attrs[keyName] === "light-text"}
        value="light-text"
      >
        Dark
      </option>
      <option
        selected={block()?.attrs[keyName] === "dark-text"}
        value="dark-text"
      >
        Lignt
      </option>
    </select>
  );
};
