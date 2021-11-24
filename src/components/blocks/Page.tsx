/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { FiAnchor } from "react-icons/fi";
import { useRouter } from "next/router";
import { usePage } from "store/pageStore";
import { useStickyState, getPageBySlug, setItemToStorage} from "helpers/localMockupApi"

export const Page: React.FC = () => {
  const slugPath = useRouter().query?.slugPath || ["home"];
  const buttonClass =
    " bg-blue-400 w-full p-2 rounded mt-1 text-white hover:bg-blue-500";
  const buttonDeleteClass =
    " bg-red-400 w-full p-2 rounded mt-1 text-white hover:bg-red-500";

  /* Data loader localstorage */
  const [ storagePosts, setStoragePosts ] = useStickyState([], 'storagePosts');
  const currentPage = getPageBySlug(slugPath[0], storagePosts);

  

  return (
    currentPage && (
      <div>
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
            /* Data loader localstorage */
            setItemToStorage(currentPage, storagePosts, setStoragePosts, 'slug')
          }}
        >
          <fieldset className="p-2">
            <div className="w-full p-2 text-sm">Page title</div>
            <input
              key={currentPage?.title}
              className="w-full p-2 border"
              defaultValue={currentPage?.title}
              onChange={(e) => (currentPage.title = e.target.value)}
            />
          </fieldset>
          {!currentPage.new && (
            <fieldset className="p-2 border-t">
              <label className="w-full px-2 text-sm">Layout</label>
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
            </fieldset>
          )}
         
          {!currentPage.new && (
            <fieldset className="p-2 border-t grid grid-cols-2 gap-1">
              <button className={buttonClass}>Update page</button>
              <button className={buttonDeleteClass}>Delete page</button>
            </fieldset>
          )}
          {currentPage.new && (
            <fieldset className="p-2 border-t">
              <button className={buttonClass}>Create page</button>
            </fieldset>
          )}
    
        </form>
      </div>
    )
  );
};
