/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { useMutation } from '@apollo/client';
import { FiLink, FiLogOut } from "react-icons/fi";
import { v4 as uuidv4 } from 'uuid';
import { getFromStore, useApp, pushToStore, useBlocks } from "store";
import { CREATE_BLOCK } from "components/blocks/gql/composer"
interface Props {
  type: string;
}

export const NavBlocks: React.FC = ({type}) => {
  
 const targeter = useApp((state) => state.custom.activeTargeter);
  const blocks = getFromStore({store:"display", ref:"blocks" });
  
  /* local consts */
  const r = getFromStore({store:"router",ref:"slugPath"})
  const prefix = {
    id: uuidv4(),
    post: r[1],
    order: parseInt(blocks[blocks.length - 1].order) + 1,
    parentId: type === "next" 
      ? targeter?.parentId === 0 ? "0" : targeter?.parentId 
      : targeter?.id,
  };

  const buttonClass =
    "text-sm bg-blue-500 w-full p-2 rounded mt-1 text-white hover:bg-blue-800 flex items-center";  
 
  /* mutation */
  const [addNewBlock, { data, loading, error }] = useMutation(CREATE_BLOCK, {
    onCompleted(data) {
        
        const payload = Object.assign({},data.createBlock) 
        payload.parentId === "0" ? payload.parentId = 0 : null
        pushToStore({store:"display", ref:`blocks`, data:payload})
    
        useApp.setState({ custom: { activeTargeter:payload }})
        useBlocks.setState({ panel: "block", composerTab: null });

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
