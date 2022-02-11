/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { useMutation } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

import { getFromStore, useApp, pushToStore, useBlocks } from "store";
import { CREATE_BLOCK } from "components/blocks/gql/composer";
interface Props {
  type: string;
}

export const DataBlocks: React.FC = ({ type }) => {
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
      payload.parentId === "0" ? (payload.parentId = 0) : null;
      pushToStore({ store: "display", ref: `blocks`, data: payload });

      useApp.setState({ custom: { activeTargeter: payload } });
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
      !block.order ? (block.order = 600) : null;
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
            block: "data/Query",
            attrs: {
              refName: prefix.id,
              query: "",
              childrenSlots: [],
              initActions: [],
              classes: "",
            },
          })
        }
      >
        Query
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          teachSetBlock({
            ...prefix,
            block: "data/PlainData",
            attrs: {
              dataTarget: "",
              classes: "",
            },
          })
        }
      >
        Plain data
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          teachSetBlock({
            ...prefix,
            block: "data/ListData",
            attrs: {
              dataTarget: "",
              filterActions: [],
              classes: "",
            },
          })
        }
      >
        List data
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          teachSetBlock({
            ...prefix,
            block: "data/ParseDate",
            attrs: {
              dateFormat: "en-US",
              text: "2022-01-28T09:07:07.305Z",
              classes: "",
            },
          })
        }
      >
        Parse date
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          teachSetBlock({
            ...prefix,
            block: "data/Schedule",
            attrs: {
              classes: "",
            },
          })
        }
      >
        Schedule
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          teachSetBlock({
            ...prefix,
            block: "data/MiniTermSchedule",
            attrs: {
              classes: "",
            },
          })
        }
      >
        Mini term schedule
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          teachSetBlock({
            ...prefix,
            block: "data/MapBox",
            attrs: {
              token: "",
              classes: "",
            },
          })
        }
      >
        Map box
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          teachSetBlock({
            ...prefix,
            block: "data/Stars",
            attrs: {
              classes: "",
            },
          })
        }
      >
        Stars
      </button>

      <button
        className={buttonClass}
        onClick={(e) =>
          teachSetBlock({
            ...prefix,
            block: "data/StatedTabs",
            attrs: {
              classes: "",
            },
          })
        }
      >
        Stated Tabs
      </button>
    </div>
  );
};
