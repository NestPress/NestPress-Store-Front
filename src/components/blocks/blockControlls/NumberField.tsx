import { useBlocks } from "store/blocksStore";
import { useStickyState, setItemToStorage} from "helpers/localMockupApi"
interface Props {
  keyName: string;
}
export const NumberField: React.FC<Props> = ({ keyName }) => {
  const blocks = useBlocks((state) => state.blocks);
  const block:any = () => blocks.find((x:any) => x.id === selectedBlockId);
  const setBlockAttrs = useBlocks((state) => state.setBlockAttrs);
  const selectedBlockId = useBlocks((state) => state.selectedBlockId);

  /* Data loader localstorage */
  const [ storageBlocks, setStorageBlocks ] = useStickyState([], 'storageBlocks');


  return (
    <input
      type="number"
      onChange={(e) => {
        setBlockAttrs({ key: keyName, value: e.target.value})
        /* Data loader localstorage */
        const toStorage = storageBlocks.find((x:any) => x.id === selectedBlockId).attrs[keyName] = e.target.value 
        setItemToStorage(toStorage, storageBlocks, setStorageBlocks, 'id')
      }
      }
      className="col-span-3 border p-2 text-sm"
      value={block()?.attrs[keyName]}
    />
  );
};
