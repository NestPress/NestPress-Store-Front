/* TODO fix type */
// @ts-ignore
// @ts-nocheck

import { MainMapper } from "components/MainMapper";
import { BottomBar } from "components/blocks";
import { useQuery } from "@apollo/client";
import { GET_BLOCKS } from "components/nestpress";
import { useApp, getFromStore } from "store";
import { handlingLayouts, remapHandlers } from "helpers";
import { useState } from "react";

const ComposerPage: React.FC = () => {

  const blocks = useApp((state) => state.display.blocks) || [];
  // const tick = useApp((state) => state.custom.tick);
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
    <>
      {blocks.length > 0 && (
        <MainMapper
          blocks={blocks}
          layout={layout}
          router={getFromStore({ store: "router" })}
          parentId={layout[0]}
        />
      )}
      <BottomBar />
    </>
  );
};
export default ComposerPage;
