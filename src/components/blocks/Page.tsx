/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { memo, useEffect,useState } from "react";
import { FiAnchor, FiType, FiMessageSquare, FiFile } from "react-icons/fi";
import { useRouter, useHistory } from "next/router";
import { useBlocks, useApp, pushToStore } from "store";
import { v4 as uuidv4 } from "uuid";

import { useQuery, useMutation } from "@apollo/client";
import {
  GET_POST_BY_SLUG,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  CREATE_BLOCK,
} from "components/blocks/gql/composer";

export const Page: React.FC = memo(() => {
  const router = useRouter();
  const slugPath = router.query?.slugPath || ["Page", "home"];
  const message = useBlocks((state) => state.message);
  const messageType = useBlocks((state) => state.messageType);
  const blocks = useApp((state) => state.display.blocks) || [];

  const [activeCreate, setActiveCreate] = useState(false);
  
  const guard = true;
    const haveBlocks = (blocks) => {
      useEffect(() =>{

        const guard = false;
        blocks.forEach((el) => {
          if(el.post == slugPath[1]){
            guard = true
            return false
          }
        })
        console.log('effect', guard)
        setActiveCreate(guard)
      }, [blocks])
    }
    haveBlocks(blocks)
 
  

  // console.log('bb',haveBlocks(blocks))

  const buttonClass =
    " bg-blue-400 w-full p-2 rounded mt-1 text-white hover:bg-blue-500";
  const buttonDeleteClass =
    " bg-red-400 w-full p-2 rounded mt-1 text-white hover:bg-red-500";
  const messagClass =
    messageType === "success" ? "bg-green-100" : "bg-yellow-100";

  /* Data loader localstorage */
  const { queryLoading, queryError, data, refetch } = useQuery(
    GET_POST_BY_SLUG,
    {
      variables: {
        slug: slugPath[1],
      },
      onCompleted(loadedPost) {
        useBlocks.setState({ currentPage: loadedPost.getPostBySlug });
      },
    }
  );

  const currentPage = Object.assign(
    {
      slug: slugPath[1],
      postType: slugPath[0],
      title: slugPath[0] === "Layout" ? `${slugPath[1]}` : "",
    },
    data?.getPostBySlug || {}
  );

  /* mutation */
  const [addNewPost, { addNewPostData, addNewPostLoading, addNewPostError }] =
    useMutation(CREATE_POST, {
      onCompleted(addNewPostData) {
        useApp.setState({ display: { blocks: [] } });

        currentPage.id = addNewPostData.createPost.id;
        currentPage.slug = addNewPostData.createPost.slug;
        currentPage.postType = addNewPostData.createPost.postType;
        currentPage.title = addNewPostData.createPost.title;
        router.push(
          `${slugPath[0]}/${slugPath[1]}/${Math.floor(Math.random() * 9999)}`
        );
      },
      update: (cache) => {
        cache.evict({ id: "ROOT_QUERY", fieldName: "getPosts" });
      },
    });
  /* mutation */
  const [updatePost, { updatePostData, updatePostLoading, updatePostError }] =
    useMutation(UPDATE_POST, {
      onCompleted(updatePost) {
        console.log("update post", updatePost);
        useBlocks.setState({ message: `Object updated!` });
        useBlocks.setState({ messageType: "success" });
        router.push(
          `${slugPath[0]}/${slugPath[1]}/${Math.floor(Math.random() * 9999)}`
        );
      },
      update: (cache) => {
        cache.evict({ id: "ROOT_QUERY", fieldName: "getPosts" });
      },
    });
  /* mutation */
  const [deletePost, { deletePostData, deletePostLoading, deletePostError }] =
    useMutation(DELETE_POST, {
      onCompleted(deletePost) {
        console.log("delete post", deletePost);
        useBlocks.setState({ composerTab: "pages" });
        refetch();
      },
      update: (cache) => {
        cache.evict({ id: "ROOT_QUERY", fieldName: "getPosts" });
      },
    });
  /* mutation */
  const [
    addNewBlock,
    { addNewBlockData, addNewBlockLoading, addNewBlockError },
  ] = useMutation(CREATE_BLOCK, {
    onCompleted(addNewBlockData) {
      // const block = addNewBlockData.createBlock;
      const block = Object.assign({}, addNewBlockData.createBlock);
      console.log("ts", {
        store: "display",
        ref: `blocks`,
        data: {
          id: block.id,
          parentId: block.parentId,
          attrs: block.attrs,
          block: block.block,
          order: block.order,
          post: block.post,
        },
      });
      pushToStore({
        store: "display",
        ref: `blocks`,
        data: {
          id: block.id,
          parentId: block.parentId,
          attrs: block.attrs,
          block: block.block,
          order: block.order,
          post: block.post,
        },
      });
      useApp.setState({ custom: { activeTargeter: block } });
      // router.push(`${slugPath[0]}/${slugPath[1]}/${Math.floor(Math.random() * 9999)}`)
      // window.location.reload();
    },

    update: (cache) => {
      cache.evict({ id: "ROOT_QUERY", fieldName: "getBlocks" });
    },
  });

  return (
    <div>
      <div className="p-2 flex items-center bg-pink-600 text-white">
        <FiAnchor />
        <span className="ml-2">{slugPath[1]}</span>
        <span className="ml-2 text-xs flex-1 text-right">
          {currentPage?.createdAt &&
            new Date(currentPage?.createdAt).toDateString()}
        </span>
      </div>

      {!currentPage.id && slugPath[1] && (
        <div className="text-xs px-4 py-2 border-b flex items-top gap-1 border-t border-b bg-yellow-100">
          <div className="w-3 mt-0.5">
            <FiFile />
          </div>
          <span>
            Page {slugPath[1]} is now on predraft mode, and not submitted yet.
            Insert page title and submit to finished page creation
          </span>
        </div>
      )}

      {message && (
        <div
          className={`text-xs px-4 py-2 border-b flex items-top gap-1 ${messagClass}`}
        >
          <div className="w-3 mt-0.5">
            <FiMessageSquare />
          </div>{" "}
          <span>{message}</span>
        </div>
      )}

      {!activeCreate && (
        <div className="text-xs px-4 py-2 border-b flex items-top gap-1 border-t border-b bg-yellow-100">
          <div className="w-3 mt-0.5">
            <FiFile />
          </div>{" "}
          <span>
            Page dont have blocks!{" "}
            <span
              onClick={(e) => {
                addNewBlock({
                  variables: {
                    input: {
                      id: uuidv4(),
                      parentId: slugPath[1],
                      block: "layout/Grid",
                      post: currentPage.slug,
                      order: 
                        slugPath[0] == "Page" 
                        ? 600  
                        : slugPath[0] == "Panel" 
                        ? 800
                        : 0,
                      attrs: {
                        classes: "",
                        handler: "",
                      },
                    },
                  },
                });
                refetch();
              }}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Create first
            </span>
          </span>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (currentPage.submitType === "create") {
            delete currentPage.submitType;

            if (!currentPage.title) {
              useBlocks.setState({
                message: "Created object should have title!",
              });
              useBlocks.setState({ messageType: "Error" });
              return false;
            }

            if (!currentPage.slug) {
              useBlocks.setState({
                message: "Created object should have slug!",
              });
              useBlocks.setState({ messageType: "Error" });
              return false;
            }

            useBlocks.setState({ message: `Page ${slugPath[1]} created!` });
            useBlocks.setState({ messageType: "success" });

            currentPage.slug = currentPage.slug.toLowerCase();

            addNewPost({ variables: { input: currentPage } }).catch((error) => {
              if (error.networkError) {
                getNetworkErrors(error).then(console.log);
              } else {
                useBlocks.setState({ message: error.message });
                useBlocks.setState({ messageType: "error" });
              }
            });
            refetch();
          }
          if (currentPage.submitType === "update") {
            delete currentPage.submitType;
            updatePost({
              variables: {
                id: currentPage.id,
                input: {
                  title: currentPage.title,
                },
              },
            });
          }
          if (currentPage.submitType === "delete") {
            const techDeletePost = () => {
              delete currentPage.submitType;
              deletePost({
                variables: {
                  id: currentPage.id,
                },
              });
              router.push(`/composer/${slugPath[0]}/${slugPath[1]}`);
            };

            blocks.length == 0
              ? techDeletePost()
              : alert("delete all blocks first");
          }
        }}
      >
        <fieldset className="p-2">
          <div className="w-full p-2 text-sm flex items-center gap-1">
            <FiAnchor />
            <div>{slugPath[0]} slug</div>
          </div>
          <input
            disabled={!currentPage.id}
            key={currentPage?.slug}
            className="w-full p-2 border text-indigo-900"
            defaultValue={currentPage?.slug}
            onChange={(e) => (currentPage?.slug = e.target.value)}
          />
          <div className="w-full p-2 text-sm flex items-center gap-1">
            <FiType />
            <div>{slugPath[0]} title</div>
          </div>
          <input
            key={currentPage?.title}
            className="w-full p-2 border text-indigo-900"
            placeholder="Insert title"
            defaultValue={currentPage?.title}
            onChange={(e) => (currentPage?.title = e.target.value)}
          />
        </fieldset>

        {currentPage.id && (
          <fieldset className="p-2 border-t grid grid-cols-2 gap-1">
            <button
              onClick={(e) => {
                currentPage.submitType = "update";
              }}
              className={buttonClass}
            >
              Update {slugPath[0]}
            </button>
            <button
              onClick={(e) => {
                currentPage.submitType = "delete";
              }}
              className={buttonDeleteClass}
            >
              Delete {slugPath[0]}
            </button>
          </fieldset>
        )}
        {!currentPage.id && (
          <fieldset className="p-2 border-t">
            <button
              onClick={(e) => {
                currentPage.submitType = "create";
              }}
              className={buttonClass}
            >
              Submit titled {slugPath[1]} {slugPath[0]}
            </button>
          </fieldset>
        )}

        {currentPage.id && slugPath[0] !== "Layout" && (
          <div className="text-xs px-4 py-2 border-t border-b bg-yellow-100">
            This page dont have main layout.{" "}
            <span
              onClick={(e) => {
                router.replace(`Layout/${slugPath[0].toLowerCase()}-layout`);
                useBlocks.setState({ messageType: "error" });
              }}
              className="text-blue-800 cursor-pointer hover:underline"
            >
              Create main layout
            </span>
          </div>
        )}
      </form>
    </div>
  );
});
