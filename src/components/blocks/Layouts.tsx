/* TODO fix type */
// @ts-ignore
// @ts-nocheck
// https://tailwindcss-custom-forms.netlify.app/




export const Layouts: React.FC = () => {
  
 

  const buttonClass =
    " bg-blue-400 w-full p-2 rounded mt-1 text-white hover:bg-blue-500";

  return (
    <div className="text-sm">
      <div className="flex items-center text-base p-2 bg-pink-600 text-white">
        {/*<FiFile />*/}
        <span className="ml-2">Layouts list</span>
      </div>

      

      <div className="p-2 border-b grid grid-cols-5">
        <div className="col-span-2">Layout slug</div>
        <div className="col-span-3">Title</div>
      </div>
     {/* {data?.getPosts?.list.map((el)=>{
        return <div onClick={(e)=>{
              useBlocks.setState({composerTab:'page'})
              router.replace(`${el.postType}/${el.slug}`);
            }} 
            className={`${el.slug===slugPath[1]?"bg-green-100":"bg-white"} text-xs p-2 border-b grid grid-cols-5   hover:bg-blue-100 cursor-pointer`}>
          <div className="col-span-2">{el.slug}</div>
          <div className="col-span-2">{el.title}</div>
          <div className="text-right">&nbsp;{el.layout}</div>
        </div>
      })}*/}
      <div className="p-2 mt-1 border-t border-b">
        <div className="flex items-center text-base mb-2">
          {/*<FiAnchor />*/}
          <span className="ml-2">Register new layout</span>
        </div>
        <input
          className="w-full p-2 border mb-1"
          placeholder="Insert user email"
          // defaultValue={form.slug}
          // onChange={(e) => (form.slug = slugify(e.target.value))}
        />
        <input
          className="w-full p-2 border mb-1"
          placeholder="Insert user password"
          // defaultValue={form.title}
          // onChange={(e) => (form.title = e.target.value)}
        />
        <input
          className="w-full p-2 border"
          placeholder="Insert user first name"
          // defaultValue={form.title}
          // onChange={(e) => (form.title = e.target.value)}
        />
        <button
          onClick={(e) => {
            // addNewPost({ variables: {input:form}}).catch(error => {
            //   if (error.networkError) {
            //     getNetworkErrors(error).then(console.log)
            //   } else {
            //     console.log(error.message)
            //   }
            // });
            // refetch()
          }}
          className={buttonClass}
        >
          Register layout
        </button>
      </div>
    </div>
  );
};
