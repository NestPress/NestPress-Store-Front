/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { useMutation } from '@apollo/client';
import { FiGrid } from "react-icons/fi";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/router";
import { useBlocks } from "store/blocksStore";
import { CREATE_BLOCK } from "components/blocks/gql/composer"
interface Props {
  type: string;
}

interface Props {
  type: string;
}
export const DataBlocks: React.FC = ({type}) => {

  /* Zustand states */
  const selectedBlockId = useBlocks((state) => state.selectedBlockId);
  const blocks = useBlocks((state) => state.blocks);
  const block = () => blocks.find((x) => x.id === selectedBlockId);
  const addBlock = useBlocks((state) => state.addBlock);
  
  /* local consts */
  const router = useRouter()
  const slugPath = router.query?.slugPath || ["Page", "home"];
  const prefix = {
    id: uuidv4(),
    parentId: type === "next" ? block()?.parentId : block()?.id,
  };
  const buttonClass =
    "text-sm bg-blue-400 w-full p-2 rounded mt-1 text-white hover:bg-blue-500 flex items-center";  
 
  /* mutation */
  const [addNewBlock, { data, loading, error }] = useMutation(CREATE_BLOCK, {
    onCompleted(data) {
        console.log('insert block', data.createBlock)
        addBlock(data.createBlock);
    }, 
  });
  const teachSetBlock = (block) => {
    /* Set to zustand state */
    addNewBlock({ variables: {input:block}});
  }

  return (
    <div className="px-2">
      <button
        className={buttonClass}
        onClick={(e) =>
          teachSetBlock({
            ...prefix,
            block: "data/QueryList",
            post: slugPath[1],
            attrs: {
              query: "",
              classes: ""
            },
          })
        }
      >
        Query elements list
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          teachSetBlock({
            ...prefix,
            block: "data/QueryElement",
            post: slugPath[1],
            attrs: {
              query: "",
              classes: ""
            },
          })
        }
      >
        Query element
      </button>
    </div>
  );
};
