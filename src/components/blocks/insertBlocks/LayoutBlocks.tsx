/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { useMutation } from "@apollo/client";
import { FiGrid, FiType, FiImage, FiMonitor } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import {
  getFromStore,
  useApp,
  pushToStore,
  useBlocks,
  setToStore,
} from "store";
import { CREATE_BLOCK } from "components/blocks/gql/composer";
interface Props {
  type: string;
}

export const LayoutBlocks: React.FC = ({ type }) => {
  const targeter = useApp((state) => state.custom.activeTargeter);
  const blocks = getFromStore({ store: "display", ref: "blocks" });

  /* local consts */
  const r = getFromStore({ store: "router", ref: "slugPath" });
  const prefix = {
    id: uuidv4(),
    post: r[1],
    order: parseInt(blocks[blocks.length - 1].order) + 1,
    parentId:
      type === "next"
        ? targeter?.parentId === 0
          ? "0"
          : targeter?.parentId
        : targeter?.id,
  };

  const buttonClass =
    "text-sm bg-blue-500 w-full p-2 rounded mt-1 text-white hover:bg-blue-800 flex items-center";

  /* mutation */
  const [addNewBlock, { data, loading, error }] = useMutation(CREATE_BLOCK, {
    onCompleted(data) {
      const payload = Object.assign({}, data.createBlock);
      pushToStore({ store: "display", ref: `blocks`, data: payload });
      setToStore({ store: "display", ref: `activeTargeter`, data: payload });

      useBlocks.setState({ panel: "block", composerTab: null });
    },
    update: (cache) => {
      cache.evict({ id: "ROOT_QUERY", fieldName: "getBlocks" });
    },
  });
  const teachSetBlock = (block) => {
    if (block.parentId == r[1]) {
      alert("added to layout handling block is locked");
    } else {
      /* Set to zustand state */
      !block.order ?  block.order=600 : null
      addNewBlock({ variables: { input: block } });
    }
  };

  return (
    <div className="px-2">
      <button
        className={buttonClass}
        onClick={(e) =>
          teachSetBlock({
            ...prefix,
            block: "layout/Grid",
            attrs: {
              handler: "",
              classes: "",
              styles: {},
            },
          })
        }
      >
        <FiGrid />
        <span className="ml-2">Grid</span>
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
            },
          })
        }
      >
        <FiType />
        <span className="ml-2">Title</span>
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
            },
          })
        }
      >
        <FiType />
        <span className="ml-2">Paragraph</span>
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          teachSetBlock({
            ...prefix,
            block: "layout/Img",
            attrs: {
              objectfit: "",
              imglayout: "",
              width: "",
              height: "",
              image: "/empty-person-dark.svg",
              alt: "",
              classes: "",
            },
          })
        }
      >
        <FiImage />
        <span className="ml-2">Image</span>
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          teachSetBlock({
            ...prefix,
            block: "layout/Breakpoints",
            attrs: {
              handler: "",
              classes: "",
            },
          })
        }
      >
        <FiMonitor />
        <span className="ml-2">Breakpoints</span>
      </button>
    </div>
  );
};
