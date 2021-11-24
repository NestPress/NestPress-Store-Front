import { useBlocks } from "store/blocksStore";
interface Props {
  keyName: string;
}
export const Rounded: React.FC<Props> = ({ keyName }) => {
  const blocks = useBlocks((state) => state.blocks);
  const setBlockAttrs = useBlocks((state) => state.setBlockAttrs);
  const block = () => blocks.find((x) => x.id === selectedBlockId);
  const selectedBlockId = useBlocks((state) => state.selectedBlockId);
  return (
    <select
      className="col-span-3 border bg-white py-3 px-1"
      onChange={(e) =>
        setBlockAttrs({ key: keyName, value: e.target.value })
      }
    >
      <option selected={block()?.attrs[keyName] === ""} value="">
        Empty definition
      </option>
      <option
        selected={block()?.attrs[keyName] === "rounded"}
        value="rounded"
      >
        Rounded
      </option>
    </select>
  );
};
