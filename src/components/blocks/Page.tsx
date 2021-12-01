/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { FiAnchor } from "react-icons/fi";
import { useRouter, useHistory } from "next/router";
import { useBlocks } from "store/blocksStore";

import { useQuery, useMutation } from '@apollo/client';
import { GET_POST_BY_SLUG, UPDATE_POST, DELETE_POST } from "components/blocks/gql/composer"

export const Page: React.FC = () => {
  const router = useRouter()
  const slugPath = router.query?.slugPath || ["Page", "home"];
  // const composerTab = useBlocks((state) => state.composerTab);
  const buttonClass =
    " bg-blue-400 w-full p-2 rounded mt-1 text-white hover:bg-blue-500";
  const buttonDeleteClass =
    " bg-red-400 w-full p-2 rounded mt-1 text-white hover:bg-red-500";

  /* Data loader localstorage */
  const { queryLoading, queryError, data, refetch } = useQuery(GET_POST_BY_SLUG, {
    variables: { 
      slug: slugPath[1]
    },
  });

  /* mutation */
  const [updatePost, { updatePostData, updatePostLoading, updatePostError }] = useMutation(UPDATE_POST, {
    onCompleted(updatePost) {
        console.log('update post', updatePost)
        refetch()
    }, 
  });

  const [deletePost, { deletePostData, deletePostLoading, deletePostError }] = useMutation(DELETE_POST, {
    onCompleted(deletePost) {
        console.log('delete post', deletePost)
        useBlocks.setState({ composerTab: "pages" })
        refetch()
    },
    update: (cache) => {
      cache.evict({ id: "ROOT_QUERY", fieldName: "getPosts" });
    }, 
  });

  const currentPage = Object.assign({}, data?.getPostBySlug || {});

  return (
    currentPage && (
      <div>
        <div className="p-2 flex items-center bg-pink-600 text-white">
          <FiAnchor />
          <span className="ml-2">{slugPath[1]}</span>
          <span className="ml-2 text-xs flex-1 text-right">
            {currentPage?.createdAt && new Date(currentPage?.createdAt).toDateString()}
          </span>
        </div>

        {currentPage.new && (
          <div className="text-xs px-4 py-2 border-b bg-yellow-100">
            Slug ./{slugPath[1]} dont have created as blog page yet. To finished create page '{slugPath[0]}' insert page title and run 'Save page' action
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(currentPage)
            delete currentPage.new;
            if(currentPage.submitType === 'update'){
              delete currentPage.submitType
              updatePost({ 
                variables: {
                  id: currentPage.id,
                  input: {
                    title: currentPage.title,
                  }
                }
              });
            }
            if(currentPage.submitType === 'delete'){
              delete currentPage.submitType
              deletePost({ 
                variables: {
                  id: currentPage.id,
                }
              });
              router.push(`/composer/${slugPath[0]}/${slugPath[1]}`)
            }
          }}
        >
          <fieldset className="p-2">
            <div className="w-full p-2 text-sm">{slugPath[0]} title</div>
            <input
              key={currentPage?.title}
              className="w-full p-2 border"
              defaultValue={currentPage?.title}
              onChange={(e) => (currentPage?.title = e.target.value)}
            />
          </fieldset>
          <div className="w-full p-2 flex border-t text-sm">
           <div className="p-2 text-sm">{slugPath[0]} slug:</div>
           <div className="p-2 flex-1 text-sm border">{slugPath[1]}</div>
          </div>
          {!currentPage.new && (
            <fieldset className="p-2 border-t">
              <label className="w-full px-2 text-sm">Layout</label>
              <div className="px-2 text-xs pb-2">
                Warning! Change layout dont unlink current {slugPath[0]} content. You
                should link it manually
              </div>
              <select
                // ref={ node => { currentPage.layout = node?.value }}
                className="w-full p-2 text-xs"
              >
                <option>Self contained template</option>
                <option>Main</option>
              </select>
            </fieldset>
          )}
         
          {!currentPage.new && (
            <fieldset className="p-2 border-t grid grid-cols-2 gap-1">
              <button onClick={(e)=>{currentPage.submitType="update"}} className={buttonClass}>Update {slugPath[0]}</button>
              <button onClick={(e)=>{currentPage.submitType="delete"}}  className={buttonDeleteClass}>Delete {slugPath[0]}</button>
            </fieldset>
          )}
          {currentPage.new && (
            <fieldset className="p-2 border-t">
              <button className={buttonClass}>Save {slugPath[0]}</button>
            </fieldset>
          )}
    
        </form>
      </div>
    )
  );
};
