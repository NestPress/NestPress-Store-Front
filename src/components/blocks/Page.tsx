/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { FiAnchor, FiType, FiMessageSquare } from "react-icons/fi";
import { useRouter, useHistory } from "next/router";
import { useBlocks } from "store/blocksStore";
import { v4 as uuidv4 } from 'uuid';

import { useQuery, useMutation } from '@apollo/client';
import { GET_POST_BY_SLUG, CREATE_POST, UPDATE_POST, DELETE_POST, CREATE_BLOCK } from "components/blocks/gql/composer"

export const Page: React.FC = () => {
  const router = useRouter()
  const slugPath = router.query?.slugPath || ["Page", "home"];
  const message = useBlocks((state) => state.message);
  const messageType = useBlocks((state) => state.messageType);
  const buttonClass =
    " bg-blue-400 w-full p-2 rounded mt-1 text-white hover:bg-blue-500";
  const buttonDeleteClass =
    " bg-red-400 w-full p-2 rounded mt-1 text-white hover:bg-red-500";
  const messagClass = (messageType === 'success') ? 'bg-green-100' : 'bg-yellow-100'

  /* Data loader localstorage */
  const { queryLoading, queryError, data, refetch } = useQuery(GET_POST_BY_SLUG, {
    variables: { 
      slug: slugPath[1]
    },
  });

  /* mutation */
  const [addNewPost, { addNewPostData, addNewPostLoading, addNewPostError }] = useMutation(CREATE_POST, {
    onCompleted(addNewPostData) {
      addNewBlock({ variables: {
        input:{
          id: uuidv4(),
          parentId: "0",
          block: "layout/Grid",
          post: addNewPostData.createPost.slug,
          order: (parseInt(addNewPostData.createPost.id) * 100),
          attrs: {
              classes:"",
              handler:""
          }
        }
      }});
    }, 
  });
  /* mutation */
  const [updatePost, { updatePostData, updatePostLoading, updatePostError }] = useMutation(UPDATE_POST, {
    onCompleted(updatePost) {
        console.log('update post', updatePost)
        refetch()
    }, 
  });
  /* mutation */
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
  /* mutation */
  const [addNewBlock, { addNewBlockData, addNewBlockLoading, addNewBlockError }] = useMutation(CREATE_BLOCK, {
    onCompleted(addNewBlockData) {

      const block = addNewBlockData.createBlock
      useBlocks.setState({ 
          blocks: [{...block, parentId:0}]
      })

      useBlocks.setState({ message: `Page ${slugPath[1]} with block created complete!`})
      useBlocks.setState({ messageType: 'success'})
    }, 
  });

  const currentPage = Object.assign({slug:slugPath[1]}, data?.getPostBySlug || {});



  return (
      <div>
        <div className="p-2 flex items-center bg-pink-600 text-white">
          <FiAnchor />
          <span className="ml-2">{slugPath[1]}</span>
          <span className="ml-2 text-xs flex-1 text-right">
            {currentPage?.createdAt && new Date(currentPage?.createdAt).toDateString()}
          </span>
        </div>

        { message && <div className={`text-xs px-4 py-2 border-b flex items-top gap-1 ${messagClass}`}>
          <div className="w-3 mt-0.5">
            <FiMessageSquare/>
          </div> <span>{message}</span>
        </div> }

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if(currentPage.submitType === 'create'){
              delete currentPage.submitType

              if(!currentPage.title){
                useBlocks.setState({ message: 'Created object should have title!'})
                useBlocks.setState({ messageType: 'Error'})
                return false
              }

              useBlocks.setState({ message: `Page ${slugPath[1]} created!`})
              useBlocks.setState({ messageType: 'success'})
              
              addNewPost({ variables: {input:currentPage}}).catch(error => {
                if (error.networkError) {
                  getNetworkErrors(error).then(console.log)
                } else {
                  useBlocks.setState({ message: error.message})
                  useBlocks.setState({ messageType: 'error'})
                }
              });
              refetch()
            }
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
              alert('delelete action was closed! TODO: deleted blogPost have register slug in database and blocked create another on this same')
              // delete currentPage.submitType
              // deletePost({ 
              //   variables: {
              //     id: currentPage.id,
              //   }
              // });
              // router.push(`/composer/${slugPath[0]}/${slugPath[1]}`)
            }
          }}
        >
          <fieldset className="p-2">
            <div className="w-full p-2 text-sm flex items-center gap-1"><FiAnchor/><div>{slugPath[0]} slug</div></div>
            <input
              disabled={!currentPage.id}
              key={currentPage?.slug}
              className="w-full p-2 border"
              defaultValue={currentPage?.slug}
              onChange={(e) => (currentPage?.slug = e.target.value)}
            />
           <div className="w-full p-2 text-sm flex items-center gap-1"><FiType/><div>{slugPath[0]} title</div></div>
            <input
              key={currentPage?.title}
              className="w-full p-2 border"
              defaultValue={currentPage?.title}
              onChange={(e) => (currentPage?.title = e.target.value)}
            />
          </fieldset>
         
         
         
          {currentPage.id && (
            <fieldset className="p-2 border-t grid grid-cols-2 gap-1">
              <button onClick={(e)=>{currentPage.submitType="update"}} className={buttonClass}>Update {slugPath[0]}</button>
              <button onClick={(e)=>{currentPage.submitType="delete"}}  className={buttonDeleteClass}>Delete {slugPath[0]}</button>
            </fieldset>
          )}
          {!currentPage.id && (
            <fieldset className="p-2 border-t">
              <button onClick={(e)=>{currentPage.submitType="create"}} className={buttonClass}>Submit titled {slugPath[1]} {slugPath[0]}</button>
            </fieldset>
          )}
    
        </form>
      </div>
    
  );
};
