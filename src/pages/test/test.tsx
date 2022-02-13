/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { TestMapper } from "pages/test/TestMapper";
import { app, useKeys } from "store";
import { useQuery } from "@apollo/client";
import { GET_BLOCKS, Console } from "components/nestpress";

const Test: React.FC = () => {
  const keys = useKeys((state) => state.keys);
  const addKeys = useKeys((state) => state.addKeys);
  const { loading, data } = useQuery(GET_BLOCKS, {
    variables: {
      sort: { order: "asc" },
      filter: {
        post: {
          in: 'actions',
        },
      },
    },
    onCompleted({ getBlocks: { list } } = data) { 
      addKeys(
        data.getBlocks.list.reduce((obj, el) => {
          return {
            ...obj,
            [el['id']]: {
              key:el.id,
              attrs:el.attrs
            },
          };
        },{})
      )
    },
  });
  return (
    <div className="grid grid-cols-4">
    <div className="col-span-3">
      {Array.isArray(data?.getBlocks.list) && Object.keys(keys).length !== 0 && (
        <TestMapper
          blocks={data.getBlocks.list}
          app={app}
          parentId={'actions'}
        />
      )}
    </div>
    <Console />
    </div>
  );
};
export default Test;