/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { FiAnchor } from "react-icons/fi";
import { useRouter } from "next/router";
import { usePage } from "store/pageStore";

export const Page: React.FC = () => {
  const slugPath = useRouter().query?.slugPath || ["home"];
  const buttonClass =
    " bg-blue-400 w-full p-2 rounded mt-1 text-white hover:bg-blue-500";
  const buttonDeleteClass =
    " bg-red-400 w-full p-2 rounded mt-1 text-white hover:bg-red-500";

  // const [
  //   posts,
  //   setPosts
  // ] = useStickyState([], 'posts');

  /* TODO fix type */
  // @ts-ignore: Unreachable code error
  // const currentPage = posts?.find(ob => ob.slug === slugPath[0]) ||
  //   {
  //     title: '',
  //     slug: slugPath[0],
  //     layout: 'main',
  //     type:'page',
  //     new: true
  //   }

  const currentPage = {};
  return (
    currentPage && (
      <>
        <div className="p-2 flex items-center bg-pink-600 text-white">
          <FiAnchor />
          <span className="ml-2">{slugPath[0]}</span>
        </div>

        {currentPage.new && (
          <div className="text-xs px-4 py-2 border-b bg-yellow-100">
            Slug ./{slugPath[0]} dont have created blog page. To create page{" "}
            {slugPath[0]} insert page title and run Submit action
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            delete currentPage.new;
            /* TODO fix type */
            // @ts-ignore: Unreachable code error
            // const copy = posts.map(el => ({ ...el }))
            /* TODO fix type */
            // @ts-ignore: Unreachable code error
            // const updateEl = copy.find(x => x.slug === currentPage.slug)
            /* TODO fix type */
            // @ts-ignore: Unreachable code error
            // updateEl ? updateEl = Object.assign(updateEl, currentPage) : copy.push(currentPage)
            // setPosts(copy)
          }}
        >
          <div className="p-2">
            <div className="w-full p-2 text-sm">Page title</div>
            <input
              key={currentPage?.title}
              className="w-full p-2 border"
              defaultValue={currentPage?.title}
              onChange={(e) => (currentPage.title = e.target.value)}
            />
          </div>
          {!currentPage.new && (
            <div className="p-2 border-t">
              <div className="w-full px-2 text-sm">Layout</div>
              <div className="px-2 text-xs pb-2">
                Warning! Change layout dont unlink current page content. You
                should link it manually
              </div>
              <select
                // ref={ node => { currentPage.layout = node?.value }}
                className="w-full p-2 text-xs"
              >
                <option>Main</option>
              </select>
            </div>
          )}
          <div className="p-2 border-t flex">
            {!currentPage.new && (
              <>
                <button className={buttonClass}>Update page</button>
                <button className={buttonDeleteClass}>Delete page</button>
              </>
            )}
            {currentPage.new && (
              <>
                <button className={buttonClass}>Create page</button>
              </>
            )}
          </div>
        </form>
      </>
    )
  );
};
