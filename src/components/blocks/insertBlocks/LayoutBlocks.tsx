/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { useMutation } from '@apollo/client';
import { FiGrid, FiType, FiImage, FiMonitor } from "react-icons/fi";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/router";
import { useBlocks } from "store/blocksStore";
import { CREATE_BLOCK } from "components/blocks/gql/composer"
interface Props {
  type: string;
}

export const LayoutBlocks: React.FC = ({type}) => {
  
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

  console.log('prefix',parseInt(blocks[blocks.length - 1].order));

  
  const buttonClass =
    "text-sm bg-blue-400 w-full p-2 rounded mt-1 text-white hover:bg-blue-500 flex items-center";  
 
  /* mutation */
  const [addNewBlock, { data, loading, error }] = useMutation(CREATE_BLOCK, {
    onCompleted(data) {
        const payload = Object.assign({},data.createBlock) 
        payload.parentId === "0" ? payload.parentId = 0 : null
        addBlock(payload);
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
            block: "layout/Grid",
            attrs: {
              handler:"",
              classes: "",
              /* tech attr to storege avilable ${} codes */ 
              shortcodes: {}
            },
          })
        }
      >
        <FiGrid/><span className="ml-2">Grid</span>
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          teachSetBlock({
            ...prefix,
            block: "layout/Title",
            attrs: {
              text: "Example title",
              classes: "",
              /* tech attr to storege avilable ${} codes */ 
              shortcodes: {}
            },
          })
        }
      >
        <FiType/><span className="ml-2">Title</span>
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          teachSetBlock({
            ...prefix,
            block: "layout/Paragraph",
            attrs: {
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              classes: "",
              /* tech attr to storege avilable ${} codes */ 
              shortcodes: {}
            },
          })
        }
      >
        <FiType/><span className="ml-2">Paragraph</span>
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          teachSetBlock({
            ...prefix,
            block: "layout/Img",
            post: slugPath[1],
            order: parseInt(blocks[blocks.length - 1].order) + 1,
            attrs: {
              objectfit: "",
              imglayout: "",
              width:"",
              height:"",
              image: "/empty-person-dark.svg",
              alt:"",
              classes: "",
              /* tech attr to storege avilable ${} codes */ 
              shortcodes: {}
            },
          })
        }
      >
        <FiImage/><span className="ml-2">Image</span>
      </button>

   

      <button
        className={buttonClass}
        onClick={(e) =>
          teachSetBlock({
            ...prefix,
            post: slugPath[1],
            block: "layout/Breakpoints",
            attrs: {
              classes: ""
            },
          })
        }
      >
        <FiMonitor/><span className="ml-2">Breakpoints</span>
      </button>
    </div>
  );
};
