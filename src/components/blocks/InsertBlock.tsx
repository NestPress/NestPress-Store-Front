 
import { FiCornerRightDown, FiArrowDown } from "react-icons/fi";
import { BlocksHeader} from 'components/blocks'
import { useBlocks } from 'store/blocksStore'
interface Props {
  type: string
}
export const InsertBlock: React.FC<Props> = ({type}) => {
	
	const blocks = useBlocks((state) => state.blocks);
	const addBlock = useBlocks((state) => state.addBlock);
	const selectedBlockId = useBlocks((state) => state.selectedBlockId);
  const insertBlocksType = useBlocks((state) => state.insertBlocksType);
  const block = () =>  blocks.find(x => x.id === selectedBlockId);

  const buttonClass = " bg-blue-400 w-full p-2 rounded mt-1 text-white hover:bg-blue-500"
  const uid = () => ((new Date().getTime()).toString(36))
 	
  const prefix = { "id": uid(), "parentId": type === 'next' ? block().parentId : block().id }
  return(
    <>
      <BlocksHeader/> 
      <div className="p-2">
        {type==='child' && <FiCornerRightDown/>}
        {type==='next' && <FiArrowDown/>}
        Insert {type} block
      </div>
      <div className="flex border-t border-b mb-2 text-xs">
        <div 
          onClick={(e)=>useBlocks.setState({insertBlocksType:'layout'})}
          className={`p-3 flex-1 border-r text-center 
            ${insertBlocksType==='layout' ? "bg-gray-100" : "cursor-pointer"}`}>Layout</div>
        <div 
          onClick={(e)=>useBlocks.setState({insertBlocksType:'nav'})}
          className={`p-3 flex-1 border-r text-center 
            ${insertBlocksType==='nav' ? "bg-gray-100" : "cursor-pointer"}`}>Nav</div>
      	<div 
          onClick={(e)=>useBlocks.setState({insertBlocksType:'form'})}
          className={`p-3 flex-1 border-r text-center 
            ${insertBlocksType==='form' ? "bg-gray-100" : "cursor-pointer"}`}>Form</div>
      	<div 
          onClick={(e)=>useBlocks.setState({insertBlocksType:'data'})}
          className={`p-3 flex-1 text-center 
            ${insertBlocksType==='data' ? "bg-gray-100" : "cursor-pointer"}`}>Data</div>
      </div>
      {insertBlocksType==='layout' &&
        <div className="px-2">
          <button className={buttonClass} 
            onClick={(e)=>addBlock( { 
            	...prefix, 
            	block: "layout/Grid", 
            	attrs:{
            		cols: 1
            	} 
            })} >Grid</button>

          <button className={buttonClass} 
            onClick={(e)=>addBlock( { 
            	...prefix, 
            	block: "layout/Title", 
            	attrs:{
            		text: "Example title",
            		color: "dark-text"
            	} 
            })} >Title</button>


          <button className={buttonClass} >Paragraph</button>
          <button className={buttonClass} >Image</button>
        </div>
      }

      {insertBlocksType==='form' &&
        <div className="px-2">
          <button className={buttonClass} 
            onClick={(e)=>addBlock( { 
              ...prefix, 
              block: "form/Form", 
              attrs:{
                cols: 1
              } 
            })} >Form component</button>

          <button className={buttonClass} 
            onClick={(e)=>addBlock( { 
              ...prefix, 
              block: "form/InputField", 
              attrs:{
                text: "Example title",
                color: "dark-text"
              } 
            })} >Input field</button>

          <button className={buttonClass} 
            onClick={(e)=>addBlock( { 
              ...prefix, 
              block: "form/InputField", 
              attrs:{
                text: "Example title",
                color: "dark-text"
              } 
            })} >Textarea field</button>

          <button className={buttonClass} 
            onClick={(e)=>addBlock( { 
              ...prefix, 
              block: "form/InputField", 
              attrs:{
                text: "Example title",
                color: "dark-text"
              } 
            })} >Select & search field</button>
          
          <button className={buttonClass} 
            onClick={(e)=>addBlock( { 
              ...prefix, 
              block: "form/SubmitButton", 
              attrs:{
                text: "Submit button",
                color: "dark-text"
              } 
            })} >Submit button</button>

        </div>
      }

      {insertBlocksType==='nav' &&
        <div className="px-2">
          <button className={buttonClass} 
            onClick={(e)=>addBlock( { 
              ...prefix, 
              block: "form/Form", 
              attrs:{
                cols: 1
              } 
            })} >Navigation link</button>

          <button className={buttonClass} 
            onClick={(e)=>addBlock( { 
              ...prefix, 
              block: "form/InputField", 
              attrs:{
                text: "Example title",
                color: "dark-text"
              } 
            })} >Navigation button</button>
          
          <button className={buttonClass} 
            onClick={(e)=>addBlock( { 
              ...prefix, 
              block: "form/SubmitButton", 
              attrs:{
                text: "Submit button",
                color: "dark-text"
              } 
            })} >Logout link</button>

        </div>
      }

      {insertBlocksType==='data' &&
        <div className="px-2">
          <button className={buttonClass} 
            onClick={(e)=>addBlock( { 
              ...prefix, 
              block: "form/Form", 
              attrs:{
                cols: 1
              } 
            })} >Query elements list</button>

          <button className={buttonClass} 
            onClick={(e)=>addBlock( { 
              ...prefix, 
              block: "form/InputField", 
              attrs:{
                text: "Example title",
                color: "dark-text"
              } 
            })} >Query element</button>
          
         

        </div>
      }
    </>
  )
}