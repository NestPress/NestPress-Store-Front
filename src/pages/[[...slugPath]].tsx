/* TODO fix type */
// @ts-ignore
// @ts-nocheck

// p-2
// bg-white
// border-t
// border-r
// hover:bg-gray-200
// bg-gray-50
// bg-blue-200
// ml-4
// text-center
// bg-gray-100
// grid
// gap-2
// mt-4
// grid-cols-3
// py-4
// mt-8
// text-gray-500
// font-bold
// mb-8
// col-span-2
// rouded
// mx-20
// mb-20
// block
// mt-20
// text-gray-700
// text-5xl
// p-4
// grid-cols-10
// col-span-5
// justify-end
// w-64
// mb-4
// w-40
// mb-2
// bg-blue-100
// text-gray-600
// m-8
// grid-cols-2
// rounded
// text-xl
// my-3
// mt-2
// flex
// justify-center
// mx-10
// my-20
// flex-wrap
// grid-cols-6
// border-b
// text-xs
// mb-3
// text-3xl
// mx-64
// mb-10
// m-24
// p-8
// gap-6
// text-indigo-500
// grid-cols-4
// m-10
// mt-16
// rounded-md
// p-3
// text-2xl
// my-4
// border-l
// hover:bg-gray-100
// bg-blue-50
// rounded-tl
// gap-4
// items-center
// grid-cols-8
// border
// text-sm
// ml-6
// my-2
// mx-6
// text-white
// invisible
// bg-gray-200
// col-span-3
// p-1
// flex-1
// hover:text-white
// hover:bg-gray-700
// pr-4
// py-2
// justify-between
// bg-blue-500
// col-span-4
// row-span-2
// w-min
// pb-4
// w-3/12
// gap-8
// pl-4
// text-right
// underline
// text-blue-600
// pr-6
// gap-3
// bg-red-300
// row-span-3
// ml-2
// bg-yellow-200
//
// rounded-tr
// bg-pink-600
// mt-6

import { MainMapper } from "components/MainMapper";
import { BottomBar } from "components/blocks";
import { useQuery } from "@apollo/client";
import { GET_BLOCKS } from "components/nestpress";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useApp, getFromStore } from "store";

const ComposerPage: React.FC = () => {
  const router = useRouter();
  const rMix = Object.assign(
    {},
    getFromStore({ store: "router" }),
    router.query
  );
  const layout = `${rMix.slugPath[0].toLowerCase()}-layout`;
  useApp.setState({ router: rMix });

  // routing event use to change app data by routing way
  useEffect(() => {
    router.asPath === "/" ? router.push("/Page/home") : null;
  }, [router.asPath]);

  const blocks = useApp((state) => state.display.blocks) || [];
  const { loading, error, data, refetch } = useQuery(GET_BLOCKS, {
    variables: {
      sort: { order: "asc" },
      filter: {
        post: {
          in: [rMix.slugPath[1], layout, "below-footer-layout"],
        },
      },
    },
    onCompleted({ getBlocks: { list } } = data) {
      list?.length &&
        useApp.setState({
          display: { blocks: list },
        });
    },
    optimisticResponse() {
      useApp.setState({ display: { blocks: [{}] } });
    },
  });

  return (
    <>
      {blocks.length > 0 && <MainMapper blocks={blocks} router={rMix} />}
      <BottomBar />
    </>
  );
};
export default ComposerPage;
