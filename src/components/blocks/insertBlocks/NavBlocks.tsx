/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { useMutation } from '@apollo/client';
import { FiLink, FiLogOut } from "react-icons/fi";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/router";
import { useBlocks } from "store/blocksStore";
import { CREATE_BLOCK } from "components/blocks/gql/composer"
interface Props {
  type: string;
}

export const NavBlocks: React.FC = ({type}) => {
  
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
    post: slugPath[1],
    order: parseInt(blocks[blocks.length - 1].order) + 1,
    parentId: type === "next" 
      ? block()?.parentId === 0 ? "0" : block()?.parentId 
      : block()?.id,
  };
  const buttonClass =
    "text-sm bg-yellow-600 w-full p-2 rounded mt-1 text-white hover:bg-yellow-800 flex items-center";  

  /* mutation */
  const [addNewBlock, { data, loading, error }] = useMutation(CREATE_BLOCK, {
    onCompleted(data) {
        console.log('insert block', data.createBlock)
        addBlock(data.createBlock);
    }, 
    update: (cache) => {
      cache.evict({ id: "ROOT_QUERY", fieldName: "getBlocks" });
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
            block: "nav/NavLink",
            attrs: {
              title: "Example link",
              to: "/",
              classes: "",
               /* tech attr to storege avilable ${} codes */ 
              shortcodes: {}
            },
          })

        }
      >
        <FiLink/><span className="ml-2">Navigation link</span>
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          teachSetBlock({
            ...prefix,
            block: "nav/NavButton",
            attrs: {
              title: "Example button",
              to: "/",
              classes: ""
            },
          })
        }
      >
        <FiLink/><span className="ml-2">Navigation button</span>
        
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          teachSetBlock({
            ...prefix,
            block: "form/SubmitButton",
            attrs: {
              text: "Submit button",
              classes: ""
            },
          })
        }
      >
        <FiLogOut/><span className="ml-2">Logout link</span>
      </button>
    </div>
  );
};
