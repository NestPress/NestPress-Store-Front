/* TODO fix type */
// @ts-ignore
// @ts-nocheck
// https://tailwindcss-custom-forms.netlify.app/
import { slugify } from "components/blocks/helpers/blocks";
import { useQuery, useMutation} from '@apollo/client';
import { FILTER_POSTS, CREATE_POST } from "components/blocks/gql/composer"
import { useBlocks } from "store/blocksStore";
import { v4 as uuidv4 } from 'uuid';
import { getNestedChildren, prepareBlocksToClone } from 'components/blocks/helpers/blocks'

export const Reusable: React.FC = () => {

  const blocks = useBlocks((state) => state.blocks);
  
  const form = {
    slug: "",
    title: "",
    postType:"Reusable"
  };


  const buttonClass =
    " bg-blue-400 w-full p-2 rounded mt-1 text-white hover:bg-blue-500";

  const { loading, error, data, refetch } = useQuery(FILTER_POSTS,{
    variables: { 
      filter:{
        postType:{
          eq:'Reusable'
        }
      }
    },
  });

  /* mutation */
  const [addNewPost, { addNewPostData, addNewPostLoading, addNewPostError }] = useMutation(CREATE_POST, {
    onCompleted(addNewPostData) { 
      const order = addNewPostData.createPost.id;
      const blocksToSave = prepareBlocksToClone(blocks).map(el=>{return{
        id: el.id,
        parentId: el.parentId,
        attrs: el.attrs,
        block: el.block,
        post: addNewPostData.createPost.slug,
        order:order++
      }})
     console.log(blocksToSave)
    }, 
    update: (cache) => {
      cache.evict({ id: "ROOT_QUERY", fieldName: "getPosts" });
    },
  });

  return (
    <div className="text-sm">
      <div className="flex items-center text-base p-2 bg-pink-600 text-white">
        {/*<FiFile />*/}
        <span className="ml-2">Reusable blocks</span>
      </div>

      

      <div className="p-2 border-b grid grid-cols-5">
        <div className="col-span-2">Pack name</div>
        <div className="col-span-3">Category</div>
      </div>
      {data?.getPosts?.list.map((el)=>{
        return <div onClick={(e)=>{
              useBlocks.setState({composerTab:'page'})
              router.replace(`${el.postType}/${el.slug}`);
            }} 
            className={`"bg-white text-xs p-2 border-b grid grid-cols-5   hover:bg-blue-100 cursor-pointer`}>
          <div className="col-span-2">{el.slug}</div>
          <div className="col-span-2">{el.title}</div>
          <div className="text-right">&nbsp;{el.layout}</div>
        </div>
      })}
      <div className="p-2 mt-1 border-t border-b">
        <div className="flex items-center text-base mb-2">
          {/*<FiAnchor />*/}
          <span className="ml-2">Register new reusable pack</span>
        </div>
        <input
          className="w-full p-2 border text-indigo-900 mb-1"
          placeholder="Pack name"
          // defaultValue={form.slug}
          onChange={(e) => {
            form.slug = slugify(e.target.value)+'-reusable'
            form.title = e.target.value
          }}
        />
        <input
          className="w-full p-2 border text-indigo-900 mb-1"
          placeholder="Pack category"
          // defaultValue={form.title}
          // onChange={(e) => (form.title = e.target.value)}
        />
        <button
          onClick={(e) => {
            addNewPost({ variables: {input:form}}).catch(error => {
              
                console.log(error)
         
            });
          }}
          className={buttonClass}
        >
          Register layout
        </button>
      </div>
       <div className="text-xs px-4 py-2 border-b bg-yellow-100">
          Reusable pack will be created from current page and blocks
        </div>
    </div>
  );
};
