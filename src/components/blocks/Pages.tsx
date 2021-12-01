/* TODO fix type */
// @ts-ignore
// @ts-nocheck
// https://tailwindcss-custom-forms.netlify.app/
import { FiFile, FiAnchor } from "react-icons/fi";
import { useRouter } from "next/router";
import { useBlocks } from "store/blocksStore";
import { slugify } from "components/blocks/helpers/blocks";
import { useQuery, useMutation} from '@apollo/client';
import { FILTER_POSTS , CREATE_POST, CREATE_BLOCK } from "components/blocks/gql/composer"
import { v4 as uuidv4 } from 'uuid';

interface Filter {
  post_type: {
    eq: String
  }
}

export const Pages: React.FC = () => {
  
  const router = useRouter();
  const slugPath = router.query?.slugPath || ["Page","home"];
  const { loading, error, data, refetch } = useQuery(FILTER_POSTS,{
    variables: { 
      filter:{
        postType:{
          eq:slugPath[0]
        }
      }
    },
    // onCompleted(data) {
    //   console.log('no i co?', slugPath, data)
    // }
  });

  /* mutation */
  const [addNewPost, { addNewPostData, addNewPostLoading, addNewPostError }] = useMutation(CREATE_POST, {
    onCompleted(addNewPostData) {
      addNewBlock({ variables: {
        input:{
          id: uuidv4(),
          parentId: 0,
          block: "layout/Grid",
          post: addNewPostData.createPost.slug,
          attrs: {
              columns: "",
              colspan: "",
              rowspan: "",
              background: "",
              border: ""
          }
        }
      }});
      console.log(addNewPostData.createPost.slug)
    }, 
  });
  const [addNewBlock, { addNewBlockData, addNewBlockLoading, addNewBlockError }] = useMutation(CREATE_BLOCK, {
    onCompleted(addNewBlockData) {
      console.log('created', addNewBlockData)
    }, 
  });



  const form = {
    slug: "",
    title: "",
    postType:slugPath[0]
  };

  const buttonClass =
    " bg-blue-400 w-full p-2 rounded mt-1 text-white hover:bg-blue-500";

  return (
    <div className="text-sm">
      <div className="flex items-center text-base p-2 bg-pink-600 text-white">
        <FiFile />
        <span className="ml-2">Blog posts list ({slugPath[0]} type)</span>
      </div>

      <label className="block p-1 border-b">
        <select 
          onChange={(e) =>{
            router.replace(`${e.target.value}/`);
          }}
          className="form-select mt-1 block w-full border py-2 bg-white text-xs"
        >
          <option selected={slugPath[0]==="Post"} defautValue="Post">Post</option>
          <option selected={slugPath[0]==="Page"} defautValue="Page">Page</option>
          <option selected={slugPath[0]==="Comment"} defautValue="Comment">Comment</option>
          <option selected={slugPath[0]==="Event"} defautValue="Event">Event</option>
          <option selected={slugPath[0]==="Facet"} defautValue="Facet">Facet</option>
          <option selected={slugPath[0]==="Meta"} defautValue="Meta">Meta</option>
        </select>
      </label>

      <div className="p-2 border-b grid grid-cols-5">
        <div className="col-span-2">Slug</div>
        <div className="col-span-2">Title</div>
        <div className="text-rightr">Layout</div>
      </div>
      {data?.getPosts?.list.map((el)=>{
        return <div onClick={(e)=>{
              useBlocks.setState({composerTab:'page'})
              router.replace(`${el.postType}/${el.slug}`);
            }} 
            className={`${el.slug===slugPath[1]?"bg-green-100":"bg-white"} text-xs p-2 border-b grid grid-cols-5   hover:bg-blue-100 cursor-pointer`}>
          <div className="col-span-2">{el.slug}</div>
          <div className="col-span-2">{el.title}</div>
          <div className="text-right">&nbsp;{el.layout}</div>
        </div>
      })}
      <div className="p-2 mt-1 border-t border-b">
        <div className="flex items-center text-base mb-2">
          <FiAnchor />
          <span className="ml-2">Register new {slugPath[0]}</span>
        </div>
        <input
          className="w-full p-2 border mb-1"
          placeholder="Insert unique slug name"
          defaultValue={form.slug}
          onChange={(e) => (form.slug = slugify(e.target.value))}
        />
        <input
          className="w-full p-2 border"
          placeholder="Insert title"
          defaultValue={form.title}
          onChange={(e) => (form.title = e.target.value)}
        />
        <button
          onClick={(e) => {
            addNewPost({ variables: {input:form}}).catch(error => {
              if (error.networkError) {
                getNetworkErrors(error).then(console.log)
              } else {
                console.log(error.message)
              }
            });
            refetch()
            // router.replace(slugify(form.target));
            // useBlocks.setState({ composerTab: "page" });
          }}
          className={buttonClass}
        >
          Register {slugPath[0]}
        </button>
      </div>
    </div>
  );
};
