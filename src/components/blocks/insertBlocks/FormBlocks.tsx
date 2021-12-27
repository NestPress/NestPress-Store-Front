/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { useMutation } from '@apollo/client';
import { FiClipboard, FiList, FiHash, FiSave } from "react-icons/fi";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/router";
import { useBlocks } from "store/blocksStore";
import { CREATE_BLOCK } from "components/blocks/gql/composer"

interface Props {
  type: string;
}

export const FormBlocks: React.FC = ({type}) => {
  
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
            block: "form/Form",
            post: slugPath[1],
            order: parseInt(blocks[blocks.length - 1].order) + 1,
            attrs: {
              mutation: "",
              refName: prefix.id,
              consts:{},
              successActions:{},
              errorActions:{},
              classes: ""
            },
          })
        }
      >
        <FiClipboard/><span className="ml-2">Form component</span>
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          teachSetBlock({
            ...prefix,
            block: "form/InputField",
            post: slugPath[1],
            order: parseInt(blocks[blocks.length - 1].order) + 1,
            attrs: {
              label: "Example label",
              placeholder: "Example placeholder",
              outputValue: "data.input_value",
              classes: ""
            },
          })
        }
      >
        <FiHash/><span className="ml-2">Input field</span>
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          teachSetBlock({
            ...prefix,
            block: "form/TextareaField",
            post: slugPath[1],
            order: parseInt(blocks[blocks.length - 1].order) + 1,
            attrs: {
              rows: 6,
              label: "Example label",
              placeholder: "Example placeholder",
              outputValue: "data.textarea_value",
              classes: ""
            },
          })
        }
      >
        <FiHash/><span className="ml-2">Textarea field</span>
        
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          teachSetBlock({
            ...prefix,
            block: "form/SelectField",
            post: slugPath[1],
            order: parseInt(blocks[blocks.length - 1].order) + 1,
            attrs: {
              label: "Example label",
              outputValue: "data.select_value",
              placeholder: "Example placeholder",
              options:[],
              classes: ""
            },
          })
        }
      >
        <FiList/><span className="ml-2"> Select and search field</span>
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          teachSetBlock({
            ...prefix,
            block: "form/KeyValueField",
            post: slugPath[1],
            order: parseInt(blocks[blocks.length - 1].order) + 1,
            attrs: {
              placeholder1: "Insert key",
              placeholder2: "Insert value",
              submit: "Insert",
              label: "Example label",
              outputValue: "data.keys_value",
              classes: ""
            },
          })
        }
      >
        <FiList/><span className="ml-2"> Key and value field</span>
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          teachSetBlock({
            ...prefix,
            block: "form/SwithField",
            post: slugPath[1],
            order: parseInt(blocks[blocks.length - 1].order) + 1,
            attrs: {
              label: "Example label",
              outputValue: "data.swith_value",
              classes: ""
            },
          })
        }
      >
        <FiList/><span className="ml-2">Swith field</span>
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          teachSetBlock({
            ...prefix,
            block: "form/SubmitButton",
            order: parseInt(blocks[blocks.length - 1].order) + 1,
            post: slugPath[1],
            attrs: {
              title: "Submit button",
              classes: ""
            },
          })
        }
      >
        <FiSave/><span className="ml-2"> Submit button</span>
      </button>


    </div>
  );
};
