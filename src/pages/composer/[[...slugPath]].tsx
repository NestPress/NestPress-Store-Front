/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { FiFile, FiGitPullRequest, FiChevronLeft } from "react-icons/fi";
import { Composer, Tree, BlocksPocket } from "components/blocks";
import { useBlocks } from "store/blocksStore";
import { useRouter } from "next/router";
import { useEffect , useRef } from "react";
import { getNestedChildren } from 'components/blocks/helpers/blocks'
import { gql, useQuery, useMutation} from '@apollo/client';
import { GET_BLOCKS } from "components/blocks/gql/composer"


const ComposerPage: React.FC = () => {

  const selectedBlockId = useBlocks((state) => state.selectedBlockId);
  const blocksPocket = useBlocks((state) => state.blocksPocket);
  const copiedBlocks = useBlocks((state) => state.copiedBlocks);
  const router = useRouter();
  const slugPath = router.query?.slugPath || ["Page","home"];
  const blocks = useBlocks((state) => state.blocks) || [];
  const addBlock = useBlocks((state) => state.addBlock);


  const keysHandler = (e) => { 
      
      const key = e.which || e.keyCode, ctrl = e.ctrlKey ? e.ctrlKey : ((key === 17)
          ? true : false);
      if (key == 86 && ctrl) { // V
          if(selectedBlockId){
            const text = JSON.stringify(copiedBlocks)
            copiedBlocks.map(el=>{
              text = text.replaceAll(el.id, uuidv4())
            })
            const toPaste = JSON.parse(text);
            toPaste[0].parentId = selectedBlockId;
            toPaste.map( (el) => { addBlock(el) } )
          }
      }
      else if (key == 67 && ctrl) { // C
        const parsedEls = getNestedChildren(blocks, selectedBlockId, true) 
        useBlocks.setState({ copiedBlocks: parsedEls })
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
      data.getBlocks.list.length 
      ? useBlocks.setState({ 
          blocks: data.getBlocks.list.map(el => el.parentId === "0" ? {...el, parentId:0} : el) 
        })
      : console.log('create content with pagepanel')
    }
  });

 
  const currentPage = {}
  
  return (
    (
      <div tabIndex="0" onKeyDown={keysHandler}>
        {blocksPocket && <BlocksPocket />}
        <div style={{ marginRight: "20rem", marginLeft: blocksPocket ? "15rem" : null }}>
          <div className="font-bold text-base text-gray-500 border-b border-gray-300 bg-white mb-0.5 flex items-center">
            <div
              onClick={e=>useBlocks.setState({ blocksPocket: !blocksPocket })} 
              className="border-r p-3.5 mr-3 hover:bg-gray-100 cursor-pointer">
              {blocksPocket ? <FiChevronLeft/> : <FiGitPullRequest/>}
            </div>
            <FiFile/>
            <span key={router.asPath} className="ml-1">{currentPage?.title || slugPath[1]}</span>
          </div>
          <div className="pr-px">
            { blocks.length > 0 ? <Tree blocks={blocks} /> : null }
          </div>
        </div>
        <Composer />
      </div>
    ) 
  );
};
export default ComposerPage;