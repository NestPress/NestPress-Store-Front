import { useBlocks } from "store/blocksStore";
interface Props {
  keyName: string;
}
export const NumberField: React.FC<Props> = ({ keyName }) => {
  const blocks = useBlocks((state) => state.blocks);
  const block = () => blocks.find((x) => x.id === selectedBlockId);
  const setBlockAttrs = useBlocks((state) => state.setBlockAttrs);
  const selectedBlockId = useBlocks((state) => state.selectedBlockId);
  return (
    <input
      type="number"
      onChange={(e) =>
        setBlockAttrs({ key: keyName, value: e.target.value})
      }
      className="col-span-3 border p-2 text-sm"
      value={block()?.attrs[keyName]}
    />
  );
};
