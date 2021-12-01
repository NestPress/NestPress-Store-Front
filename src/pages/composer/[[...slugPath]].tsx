/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { FiFile } from "react-icons/fi";
import { Composer, Tree } from "components/blocks";
import { useBlocks } from "store/blocksStore";
import { useRouter } from "next/router";
import { useEffect , useRef } from "react";
import { getNestedChildren } from 'components/blocks/helpers/blocks'
import { gql, useQuery, useMutation} from '@apollo/client';
import { GET_BLOCKS, CREATE_BLOCK } from "components/blocks/gql/composer"
import { v4 as uuidv4 } from 'uuid';

const ComposerPage: React.FC = () => {

  const selectedBlockId = useBlocks((state) => state.selectedBlockId);
  const copiedBlocks = useBlocks((state) => state.copiedBlocks);
  const router = useRouter();
  const slugPath = router.query?.slugPath || ["home"];
  const blocks = useBlocks((state) => state.blocks) || [];
  const addBlock = useBlocks((state) => state.addBlock);


  const keysHandler = (e) => { 
      const key = e.which || e.keyCode, ctrl = e.ctrlKey ? e.ctrlKey : ((key === 17)
          ? true : false);
      if (key == 86 && ctrl) { // V
          if(selectedBlockId){
            copiedBlocks[0].parentId = selectedBlockId;
            copiedBlocks.map( (el) => { addBlock(el); setItemToStorage(el, storageBlocks, setStorageBlocks, 'id') } )
          }
          
      }
      else if (key == 67 && ctrl) { // C
        const parsedEls = getNestedChildren(blocks, selectedBlockId, true) 
        const ids = parsedEls.map((el) => {
            return el.id
         })
        const text = JSON.stringify(parsedEls)
        ids.map(el=>{
          text = text.replaceAll(el, uid())
        })
        useBlocks.setState({ copiedBlocks: JSON.parse(text) })
    }
  }


  const { loading, error, data, refetch } = useQuery(GET_BLOCKS,{
    variables: { 
      filter:{
        post:{
          eq:slugPath[1]
        }
      }
    },
    onCompleted(data) {
      console.log('first load blocks', data.getBlocks.list)
      data.getBlocks.list.length 
      ? useBlocks.setState({ 
          blocks: data.getBlocks.list.map(el => el.parentId === "0" ? {...el, parentId:0} : el) 
        })
      : addNewBlock({ 
        variables: { 
          input:{
            "id": uuidv4(),
            "parentId": "0",
            "block": "layout/Grid",
            "post": slugPath[1],
            "attrs": {
                "columns": "",
                "colspan": "",  
                "rowspan": "",
                "background": "",
                "border": ""
            }
          }
        }
      }).catch(error => {
         console.log(error.message)
          // if (error.networkError) {
          //   getNetworkErrors(error).then(console.log)
          // } else {
          //   console.log(error.message)
          // }
        })
    }
  });

  /* mutation */
  const [addNewBlock, { addNewBlockData, addNewBlockLoading, addNewBlockError }] = useMutation(CREATE_BLOCK, {
    onCompleted(addNewBlockData) {
      addNewBlockData.createBlock.parentId = 0
      useBlocks.setState({ blocks: [addNewBlockData.createBlock] })
    }, 
  });
      
  const currentPage = {}
  
  return (
    blocks.length > 0 ? (
      <div tabIndex="0" onKeyDown={keysHandler}>

        <div style={{ marginRight: "20rem" }}>
          <div className="font-bold text-gray-500 border-b border-gray-400 p-2 bg-blue-100 mb-0.5 flex items-center">
            <FiFile/><span key={router.asPath} className="ml-1">{currentPage?.title || slugPath[1]}</span>
          </div>
          <div className="pr-px">
            { <Tree blocks={blocks} /> }
          </div>
        </div>
        <Composer />
      </div>
    ) : null
  );
};
export default ComposerPage;