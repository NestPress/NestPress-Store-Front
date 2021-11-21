import { useBlocks } from "store/blocksStore";
interface Props {
  keyName: string;
}
export const FontSize: React.FC<Props> = ({ keyName }) => {
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
      <option selected={block()?.attrs[keyName] === ""} value="">
        No defined (basetext)
      </option>
      <option
        selected={block()?.attrs[keyName] === "text-xs"}
        value="text-xs"
      >
        Extra small (XS)
      </option>
      <option
        selected={block()?.attrs[keyName] === "text-sm"}
        value="text-sm"
      >
        Small (S)
      </option>
      <option
        selected={block()?.attrs[keyName] === "text-lg"}
        value="text-lg"
      >
        Large (L)
      </option>
      <option
        selected={block()?.attrs[keyName] === "text-xl"}
        value="text-xl"
      >
        Extra Large (XL)
      </option>
      <option
        selected={block()?.attrs[keyName] === "text-3xl"}
        value="text-3xl"
      >
        Extra Large (3XL)
      </option>
      
    </select>
  );
};
