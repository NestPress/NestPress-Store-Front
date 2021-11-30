import { useBlocks } from "store/blocksStore";
import { useStickyState, setItemToStorage} from "helpers/localMockupApi"
interface Props {
  keyName: string;
}
export const TextareaField: React.FC<Props> = ({ keyName }) => {
	const blocks = useBlocks((state) => state.blocks);
  const selectedBlockId = useBlocks((state) => state.selectedBlockId);
  const block:any = () => blocks.find((x:any) => x.id === selectedBlockId);
  const setBlockAttrs = useBlocks((state) => state.setBlockAttrs);

  /* Data loader localstorage */
  const [ storageBlocks, setStorageBlocks ] = useStickyState([], 'storageBlocks');

  return (
    <textarea
      onChange={(e) =>
        {
          setBlockAttrs({ key: keyName, value: e.target.value})
          /* Data loader localstorage */
          const toStorage = storageBlocks.find((x:any) => x.id === selectedBlockId).attrs[keyName] = e.target.value 
          setItemToStorage(toStorage, storageBlocks, setStorageBlocks, 'id')
        }
      }
      /* TODO fix type */
      // @ts-ignore: Unreachable code error
      rows="3"
      className="col-span-3 border p-1"
      value={block()?.attrs[keyName]}
    />
  );
};

