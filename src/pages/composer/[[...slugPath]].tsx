/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { FiFile, FiGitPullRequest, FiChevronLeft } from "react-icons/fi";
import { EditMapper, Composer, BlocksPocket } from "components/blocks";
import { handlingLayouts, remapHandlers, keysHandler } from "helpers";
import { useQuery } from "@apollo/client";
import { GET_BLOCKS } from "components/nestpress";
import { useApp, useBlocks, getFromStore, setToStore } from "store";
import { CREATE_BLOCKS, UPDATE_BLOCKS } from "components/blocks/gql/composer";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const ComposerPage: React.FC = () => {
  const blocksPocket = useBlocks((state) => state.blocksPocket);
  const targeter = useApp((state) => state.custom.activeTargeter);
  const router = useRouter();

  useBlocks.setState({ preview: true });
  /* lauouts shoudbe part of post (relation to blocks too) */
  const layout = handlingLayouts();
  let displayLayout = "";
  if (getFromStore({ store: "router" }).slugPath[0] == "Layout") {
    displayLayout = getFromStore({ store: "router" }).slugPath[1];
  } else {
    displayLayout = layout[0];
  }

  const blocks = useApp((state) => state.display.blocks) || [];
  const { data } = useQuery(GET_BLOCKS, {
    variables: {
      sort: { order: "asc" },
      filter: {
        post: {
          in: layout,
        },
      },
    },
    onCompleted({ getBlocks: { list } } = data) {
      if (getFromStore({ store: "router" }).slugPath[0] == "Layout") {
        useApp.setState({
          display: { blocks: list },
        });
      } else {
        useApp.setState({
          display: { blocks: remapHandlers(list) },
        });
      }
    },
    optimisticResponse() {
      useApp.setState({ display: { blocks: [] } });
    },
  });

  const [createBlocks] = useMutation(CREATE_BLOCKS, {
    onCompleted(createBlocksData) {
      console.log("create", createBlocksData);
    },
    update: (cache) => {
      cache.evict({ id: "ROOT_QUERY", fieldName: "getBlocks" });
    },
  });

  const [
    updateBlocks,
    { updateBlocksData, updateBlocksLoading, updateBlocksError },
  ] = useMutation(UPDATE_BLOCKS, {
    onCompleted(updateBlocksData) {
      console.log("update", updateBlocksData);
    },
    update: (cache) => {
      cache.evict({ id: "ROOT_QUERY", fieldName: "getBlocks" });
    },
  });

  return (
    <div
      className="composer"
      tabIndex="0"
      onKeyDown={(e) =>
        keysHandler(e, blocks, targeter, (res) => {
          if (res.insert) {
            createBlocks({
              variables: { input: { blocks: res.insert } },
            }).catch((error) => console.log(error.message));
          }
          if (res.update) {
            updateBlocks({
              variables: { input: { blocks: res.update } },
            }).catch((error) => console.log(error.message));
          }
        })
      }
    >
      <div
        style={{ marginLeft: blocksPocket ? "18rem" : "0px" }}
        className="font-bold text-base text-gray-500 border-b border-gray-300 bg-white mb-0.5 flex items-center"
      >
        <div
          onClick={(e) => useBlocks.setState({ blocksPocket: !blocksPocket })}
          className="border-r p-3.5  hover:bg-gray-100 cursor-pointer"
        >
          {blocksPocket ? <FiChevronLeft /> : <FiGitPullRequest />}
        </div>
        <div
          onClick={(e) => {
            setToStore({
              store: "custom",
              ref: `activeTargeter`,
              data: false,
            });
            router.push(
              `/${getFromStore({ store: "router" }).slugPath.join("/")}`
            );
          }}
          className="flex flex-1 items-center hover:bg-gray-100 p-2.5 cursor-pointer "
        >
          <FiFile />
          <div key={router.asPath} className="ml-1 flex-1">
            {getFromStore({ store: "router" }).slugPath[1]}
          </div>
          <div className="flex items-center text-xs font-normal text-blue-400">
            <FiChevronLeft />
            <span>Back to page view</span>
          </div>
        </div>
      </div>

      <div style={{ zIndex: 2000 }}>
        <Composer />
      </div>
      <div
        style={{
          marginLeft: blocksPocket ? "18rem" : "10px",
          marginRight: "330px",
          marginTop: "10px",
        }}
      >
        {blocks.length > 0 && (
          <EditMapper
            blocks={blocks}
            layout={layout}
            router={getFromStore({ store: "router" })}
            parentId={displayLayout}
          />
        )}
      </div>
      {blocksPocket && (
        <div style={{ zIndex: 10000, position: "relative" }}>
          <BlocksPocket />
        </div>
      )}
    </div>
  );
};
export default ComposerPage;
