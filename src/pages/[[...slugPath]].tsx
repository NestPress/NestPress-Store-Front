/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { MainMapper } from "components/MainMapper"
import { BottomBar } from "components/blocks";
import { prepareBlocks } from "helpers"
import { useQuery } from '@apollo/client'
import { GET_BLOCKS } from "components/nestpress"
import { useRouter } from "next/router"
import { useEffect } from "react";
import { useApp, getFromStore } from "store";

const ComposerPage: React.FC = () => {
  
  const router = useRouter();
  const rMix = Object.assign({}, getFromStore({store:"router"}), router.query)
  const layout = `${rMix.slugPath[0].toLowerCase()}-layout`
  useApp.setState({ router: rMix })

  // routing event use to change app data by routing way
  useEffect(() => {
    router.asPath === '/' ? router.push('/Page/home') : null
   
  }, [router.asPath]);  

  const blocks = useApp((state) => state.display.blocks) || [];
  const { loading, error, data, refetch } = useQuery(GET_BLOCKS,{
    variables: { 
      sort:{ order:"asc" },
      filter:{
        post:{
          in: [ rMix.slugPath[1], layout, 'below-footer-layout']
        }
      }
    },
    onCompleted({getBlocks : { list }} = data) {
      list?.length && useApp.setState({ display: { blocks:prepareBlocks(list, rMix.slugPath) }}) 
    },
    optimisticResponse(){
        useApp.setState({ display: {blocks: [{}]}});
      }
  });

  return <>{ blocks.length > 0 && <MainMapper blocks={blocks} /> }<BottomBar/></>
};
export default ComposerPage;