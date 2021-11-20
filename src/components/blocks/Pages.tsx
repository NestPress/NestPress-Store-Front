import { FiFile, FiAnchor } from "react-icons/fi";

import { useRouter } from 'next/router'
import { Mock } from 'helpers/localMockupApi'
import { useBlocks } from 'store/blocksStore'
import { useStickyState } from 'helpers/localMockupApi'
export const Pages: React.FC = () => {
  
  const router = useRouter();
  
   const [
      posts,
      setPosts
    ] = useStickyState([], 'posts');



  const form = {
    target: ''
  }
  const buttonClass = " bg-blue-400 w-full p-2 rounded mt-1 text-white hover:bg-blue-500"

 
  
  return (
    <div className="text-sm">
      <div className="flex items-center text-base p-2 bg-pink-600 text-white">
        <FiFile/><span className="ml-2">Pages list</span>
      </div>
      <div className="p-2 border-b flex">
        <div className="flex-1">Slug</div>
        <div className="flex-1 text-center">Title</div>
        <div className="flex-1 text-center">Layout</div>
      </div>
      {posts.map((el)=>{
        return <div onClick={(e)=>{
              useBlocks.setState({composerTab:'page'})
              router.replace(el.slug);
            }} 
            className="text-xs p-2 border-b flex  hover:bg-blue-100 cursor-pointer">
          <div className="flex-1">{el.slug}</div>
          <div className="flex-1 text-center">{el.title}</div>
          <div className="flex-1 text-center">{el.layout}</div>
        </div>
      })}
      <div className="p-2 mt-1 border-t border-b">
        <div className="flex items-center text-base mb-2">
          <FiAnchor/><span className="ml-2">Register new page</span>
        </div>
        <input 
            className="w-full p-2 border" 
            placeholder="Insert unique slug name"
              // defaultValue={form.title}
              onChange={(e)=>form.target = e.target.value}
             />
          <button onClick={(e)=>{

             
              router.replace(form.target);
              useBlocks.setState({composerTab:'page'})
              
            }} className={buttonClass}>Register page</button>
      </div>

    </div>  
  )}