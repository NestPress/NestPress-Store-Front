import { useBlocks } from "store/blocksStore";
interface Props {
  keyName: string;
}
export const TextareaField: React.FC<Props> = ({ keyName }) => {
	const blocks = useBlocks((state) => state.blocks);
  const selectedBlockId = useBlocks((state) => state.selectedBlockId);
  const block = () => blocks.find((x) => x.id === selectedBlockId);
  const setBlockAttrs = useBlocks((state) => state.setBlockAttrs);
  return (
    <textarea
      onChange={(e) =>
        setBlockAttrs({ key: keyName, value: e.target.value})
      }
      /* TODO fix type */
      // @ts-ignore: Unreachable code error
      rows="3"
      className="col-span-3 border p-1"
      value={block()?.attrs[keyName]}
    />
  );
};

