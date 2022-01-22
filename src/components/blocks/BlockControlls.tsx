/* TODO fix type */
// @ts-ignore
// @ts-nocheck

import {
  FiCornerRightDown,
  FiArrowDown,
  FiArrowUp,
  FiExternalLink,
  FiArrowRight,
} from "react-icons/fi";
import { BlocksHeader, MainTabs } from "components/blocks";
import { useApp, useBlocks, setToStore, removeById, itemById } from "store";
import { useMutation } from "@apollo/client";
import {
  UPDATE_BLOCK,
  UPDATE_BLOCKS,
  DELETE_BLOCK,
} from "components/blocks/gql/composer";
import { getSliblings, sanitBlock } from "helpers";
import { getNestedChildren } from "components/blocks/helpers/blocks";
import {
  LabelNameValue,
  DataTarget,
  QueryField,
  EnumField,
  TagsField,
  InputField,
  ImgObjectFit,
  ImgLayout,
  TextareaField,
  KeyValueField,
  NumberField,
} from "components/blocks/blockControllsFolder";

export const BlockControlls: React.FC = () => {
  const targeter = useApp((state) => state.custom.activeTargeter);
  const blocks = useApp((state) => state.display.blocks);
  const replace = useBlocks((state) => state.replace);
  const clickAndDrop = () => {
    setToStore({ store: "custom", ref: `activeTargeter.drop`, data: true });
    setToStore({ store: "custom", ref: `blocksCopy`, data: true });
  };
  const swapBlocks = (_in) => {
    // const item = itemById({store:'display',ref:'blocks.id', data:targeter.id})
    const item = getSliblings(blocks, targeter);
    const out = [];

    if (_in.mode == "up") {
      if (item.itemLeft) {
        const update = [
          { ...targeter, order: item.itemLeft.order },
          { ...item.itemLeft, order: item.item.order },
        ];
        setToStore({
          store: "display",
          ref: `blocks.${item.itemLeft.index}`,
          data: sanitBlock(update[0]),
        });
        setToStore({
          store: "display",
          ref: `blocks.${item.index}`,
          data: sanitBlock(update[1]),
        });

        updateBlocks({
          variables: {
            input: { blocks: [sanitBlock(update[0]), sanitBlock(update[1])] },
          },
        }).catch((error) => console.log(error.message));
      }
    }
    if (_in.mode == "down") {
      if (item.itemRight) {
        const update = [
          { ...targeter, order: item.itemRight.order },
          { ...item.itemRight, order: item.item.order },
        ];
        setToStore({
          store: "display",
          ref: `blocks.${item.itemRight.index}`,
          data: sanitBlock(update[0]),
        });
        setToStore({
          store: "display",
          ref: `blocks.${item.index}`,
          data: sanitBlock(update[1]),
        });

        updateBlocks({
          variables: {
            input: { blocks: [sanitBlock(update[0]), sanitBlock(update[1])] },
          },
        }).catch((error) => console.log(error.message));
      }
    }
  };

  const [
    updateBlock,
    { updateBlockData, updateBlockLoading, updateBlockError },
  ] = useMutation(UPDATE_BLOCK, {
    onCompleted(updateBlockData) {
      console.log("update", updateBlockData);
    },
    update: (cache) => {
      cache.evict({ id: "ROOT_QUERY", fieldName: "getBlocks" });
      // cache.evict({ id: "ROOT_QUERY", fieldName: "getPosts" });
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
      // cache.evict({ id: "ROOT_QUERY", fieldName: "getPosts" });
    },
  });

  const [
    deleteBlock,
    { deleteBlockData, deleteBlockLoading, deleteBlockError },
  ] = useMutation(DELETE_BLOCK, {
    onCompleted(deleteBlockData) {
      removeById({ store: "display", ref: "blocks.id", data: targeter.id });
      useBlocks.setState({ panel: "mainPanel" });
    },
    update: (cache) => {
      cache.evict({ id: "ROOT_QUERY", fieldName: "getBlocks" });
      // cache.evict({ id: "ROOT_QUERY", fieldName: "getPosts" });
    },
  });

  const buttonClass =
    "flex items-center bg-blue-400 w-full p-2 rounded  text-white hover:bg-blue-500";
  const buttonDel =
    "flex items-center bg-red-400 w-full p-2 rounded  text-white hover:bg-blue-500";

  const res = (res) => {
    if (res.mutation) {
      saveData(res);
    } else {
      setToStore({
        store: "display",
        ref: `blocks.${blocks.findIndex((x) => x.id === targeter.id)}.attrs.${
          res.key
        }`,
        data: res.value,
      });
      setToStore({
        store: "custom",
        ref: `activeTargeter.attrs.${res.key}`,
        data: res.value,
      });
    }
    /* hack to rerender after first loading */
    // router.push(`${slugPath[0]}/${slugPath[1]}/${Math.floor(Math.random() * 9999)}`)
  };

  function saveData(res) {
    const refBlock = targeter;
    const copy = JSON.parse(JSON.stringify(refBlock.attrs));
    copy[res.key] = res.value;

    /* TODO - for queries variables */
    if (typeof res.value === "object") {
      alert("object update todo");
      console.log("start update object", res.key, res.value, copy);
    }

    // /* -------------------------- */
    updateBlock({
      variables: {
        id: refBlock.archiveId ? refBlock.archiveId : refBlock.id,
        input: {
          id: refBlock.archiveId ? refBlock.archiveId : refBlock.id,
          post: refBlock.post,
          parentId: refBlock.parentId === 0 ? "0" : refBlock.parentId,
          block: refBlock.block,
          attrs: copy,
        },
      },
    }).catch((error) => console.log(error.message));
  }

  return (
    <div style={{ height: "100vh", overflowX: "scroll" }}>
      <MainTabs />
      <BlocksHeader title={targeter?.block || ""} />
      <div className="grid grid-cols-10 text-xs px-2 pt-2">
        <div className="col-span-2 p-px border-t border-l">ID</div>
        <div className="col-span-8 p-px border-t border-r border-l bg-gray-100 ">
          {targeter?.id || ""}
        </div>
        <div className="col-span-2 p-px border-t border-l ">ParentID</div>
        <div className="col-span-8 p-px border-t border-r bg-gray-100">
          {targeter?.parentId || ""}
        </div>

        <div className="col-span-2 p-px border-t border-l border-b">Post</div>
        <div className="col-span-3 p-px border-t border-l border-b bg-gray-100">
          {targeter?.post || ""}
        </div>

        <div className="col-span-2 p-px border-t border-l border-b">Order</div>
        <div className="col-span-3 p-px border bg-gray-100">
          {targeter?.order || ""}
        </div>
      </div>

      <div className="col-span-2 p-2 mt-2 text-xs font-bold bg-gray-200">
        Attributes
      </div>

      <div
        className={`${
          updateBlockLoading ? "pointer-events-none" : null
        }  grid grid-cols-2 text-xs gap-1 px-2`}
      >
        {Object.keys(targeter?.attrs || {}).map((key, index) => {
          return !replace ? (
            <div
              key={index}
              className={` ${
                key !== "width" && key !== "height" ? "col-span-2" : ""
              }`}
            >
              {
                /* Print key */
                key !== "childrenSlots" && (
                  <div
                    key={index}
                    className="py-1 flex items-center mt-1 font-bold text-gray-600"
                  >
                    {key}:
                  </div>
                )
              }

              {
                /* Print number controll */ (key === "width" ||
                  key === "height") && (
                  <NumberField
                    key={`nbr-${index}`}
                    keyName={key}
                    res={res}
                    block={targeter}
                  />
                )
              }

              {
                /* Print textarea controll */
                (key === "text" || key === "mutation") && (
                  <TextareaField
                    key={`txa-${index}`}
                    keyName={key}
                    res={res}
                    block={targeter}
                  />
                )
              }

              {key === "imglayout" && (
                <ImgLayout
                  key={`bgc-${index}`}
                  keyName={key}
                  res={res}
                  block={targeter}
                />
              )}
              {key === "objectfit" && (
                <ImgObjectFit
                  key={`bgc-${index}`}
                  keyName={key}
                  res={res}
                  block={targeter}
                />
              )}

              {(key === "variables" ||
                key === "consts" ||
                key === "styles") && (
                <KeyValueField
                  key={`bgc-${index}`}
                  keyName={key}
                  res={res}
                  block={targeter}
                />
              )}

              {(key === "errorActions" || key === "successActions") && (
                <EnumField
                  key={`bgc-${index}`}
                  keyName={key}
                  res={res}
                  block={targeter}
                />
              )}

              {key === "classes" && (
                <TagsField
                  key={`bgc-${index}`}
                  keyName={key}
                  res={res}
                  block={targeter}
                />
              )}

              {key === "query" && (
                <QueryField
                  key={`bgc-${index}`}
                  keyName={key}
                  res={res}
                  block={targeter}
                />
              )}

              {key === "dataTarget" && (
                <DataTarget
                  key={`bgc-${index}`}
                  keyName={key}
                  res={res}
                  block={targeter}
                />
              )}

              {key === "options" && (
                <LabelNameValue
                  key={`bgc-${index}`}
                  keyName={key}
                  res={res}
                  block={targeter}
                />
              )}

              {key !== "text" &&
                key !== "mutation" &&
                key !== "imglayout" &&
                key !== "objectfit" &&
                key !== "width" &&
                key !== "height" &&
                key !== "classes" &&
                key !== "query" &&
                key !== "options" &&
                key !== "variables" &&
                key !== "consts" &&
                key !== "errorActions" &&
                key !== "successActions" &&
                key !== "childrenSlots" &&
                key !== "dataTarget" &&
                key !== "styles" && (
                  <InputField
                    key={`brd-${index}`}
                    keyName={key}
                    res={res}
                    block={targeter}
                  />
                )}
            </div>
          ) : null;
        })}
      </div>

      {!replace ? (
        <div
          style={{ position: "sticky", bottom: 0 }}
          className="bg-white px-2 mt-2 border-t pt-2 grid grid-cols-2 gap-1 text-sm"
        >
          <button
            className={buttonClass}
            onClick={(e) => useBlocks.setState({ panel: "insertChild" })}
          >
            <FiCornerRightDown />
            <span className="ml-2">Insert child</span>
          </button>

          <button
            className={buttonClass}
            onClick={(e) => useBlocks.setState({ panel: "insertNext" })}
          >
            <FiArrowRight />
            <span className="ml-2">Insert next</span>
          </button>

          <button
            className={buttonClass}
            onClick={(e) => swapBlocks({ mode: "up" })}
          >
            <FiArrowUp />
            <span className="ml-2">Move up</span>
          </button>

          <button
            className={buttonClass}
            onClick={(e) => swapBlocks({ mode: "down" })}
          >
            <FiArrowDown />
            <span className="ml-2">Move down</span>
          </button>

          <button className={buttonClass} onClick={(e) => clickAndDrop()}>
            <FiExternalLink />
            <span className="ml-2">Click and drop</span>
          </button>

          <button
            className={buttonDel}
            onClick={(e) => {
              useBlocks.setState({ panel: "mainPanel" });
              deleteBlock({
                variables: {
                  id: targeter.id,
                },
              }).catch((error) => console.log(error.message));
            }}
          >
            <FiExternalLink />
            <span className="ml-2">Remove</span>
          </button>
        </div>
      ) : (
        <div className="text-xs p-2 border-t border-b bg-yellow-100">
          Select parent block to replace
        </div>
      )}
    </div>
  );
};
