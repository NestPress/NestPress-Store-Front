/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { FiFile } from "react-icons/fi";
import { PureTree, BottomBar } from "components/blocks";
import { useBlocks } from "store/blocksStore";
import { useRouter } from "next/router";
import { useQuery } from '@apollo/client';
import { GET_BLOCKS } from "components/blocks/gql/composer"

const ComposerPage: React.FC = () => {

  const selectedBlockId = useBlocks((state) => state.selectedBlockId);
  const router = useRouter();
  const slugPath = ["Page","home"];
  
  if(Object.entries(router.query).length !== 0){
     router.query.slugPath[0] ? slugPath[1] = router.query.slugPath[1] : null
     router.query.slugPath[1] ? slugPath[0] = router.query.slugPath[0] : null
  }

  const blocks = useBlocks((state) => state.blocks) || [];

  const prepareBlocks = (list) => {
    
    const outBlocks = []
    const handlersBlocks = {};
    const layout = `${slugPath[0].toLowerCase()}-layout`

    // First iterator
    const i = 0, len_i = list.length;
    while (i < len_i) {
      if( list[i].parentId === "0" ){
        outBlocks[i] = { ...list[i], parentId: 0 };
        handlersBlocks[list[i].post] = {...list[i], i}; 
      }else{
        outBlocks[i] = list[i]
      } 
      i++
    }
    // Second iterator
    const j = 0, len_j = list.length;
    while (j < len_j) {
      if(list[j]?.attrs?.handler){
        const blockIndex = handlersBlocks[slugPath[1]].i
        outBlocks[blockIndex].parentId = list[j].id
      }
      j++
    }
  return  outBlocks
  }

  const { loading, error, data, refetch } = useQuery(GET_BLOCKS,{
    variables: { 
      sort:{order:"asc"},
      filter:{
        post:{
          // TODO - add system to controll loaded layouts
          // eq:slugPath[1]
          in: [
            // main blocks from router
            slugPath[1],
            // page layout 
            'page-layout'
            // some extra layout
          ]
        }
      }
    },
    onCompleted(data) {
      data.getBlocks.list.length 
      ? useBlocks.setState({ blocks: prepareBlocks(data.getBlocks.list) })
      : null    
    }
  });
  return (
      <>
        {
           blocks.length > 0 ? ( <PureTree blocks={blocks} />   ) : null
        }
        <BottomBar/>
      </>
  );
};
export default ComposerPage;