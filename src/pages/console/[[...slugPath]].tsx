/* TODO fix type */
// @ts-ignore
// @ts-nocheck

import { ConsoleMapper } from "components/nestpress/ConsoleMapper";

import { useQuery } from "@apollo/client";
import { GET_BLOCKS, Console } from "components/nestpress";
import { useApp, getFromStore } from "store";
import { handlingLayouts, remapHandlers } from "helpers";
import { useState } from "react";

const ComposerPage: React.FC = () => {

  const blocks = useApp((state) => state.display.blocks) || [];
  /* lauouts shoudbe part of post (relation to blocks too) */
  const layout = handlingLayouts();

  const { loading, data } = useQuery(GET_BLOCKS, {
    variables: {
      sort: { order: "asc" },
      filter: {
        post: {
          in: layout,
        },
      },
    },
    onCompleted({ getBlocks: { list } } = data) {
      useApp.setState({
        display: { blocks: remapHandlers(list) },
      });
    },
  });
  return (
    <div className="grid grid-cols-4">
      <div className="col-span-3">
      {blocks.length > 0 && (
        <ConsoleMapper
          blocks={blocks}
          layout={layout}
          router={getFromStore({ store: "router" })}
          parentId={layout[0]}
        />
      )}
      </div>
      <Console />
    </div>
  );
};
export default ComposerPage;
