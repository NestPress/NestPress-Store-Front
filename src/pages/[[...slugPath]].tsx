import { Composer, Tree } from "components/blocks";
import { useBlocks } from "store/blocksStore";
import { useStickyState , setItemToStorage } from "helpers/localMockupApi";
import { useRouter } from "next/router";
import { uid } from 'components/blocks/helpers/blocks'

const Home: React.FC = () => {

  const slugPath = useRouter().query?.slugPath || ["home"];
  const blocks = useBlocks((state) => state.blocks)?.filter((x) => x.post === slugPath[0]) || [];
  const [ storageBlocks, setStoregeBlocks ] = useStickyState([], 'storageBlocks');
  const blocksBySlug = () => storageBlocks?.filter((x) => x.post === slugPath[0]);

  const starterBlocks = [{
        "id": uid(),
        "parentId": 0,
        "block": "layout/Grid",
        "post": slugPath[0],
        "attrs": {
            "columns": "",
            "colspan": "",
            "rowspan": "",
            "background": "",
            "border": ""
        }
      }]

  if(blocks.length == 0){
    if(blocksBySlug()?.length == 0){
      useBlocks.setState({ blocks: starterBlocks })
      starterBlocks.map(
        (el) => setItemToStorage(el, storageBlocks, setStoregeBlocks, 'id' )
      ) 
    }else{
      useBlocks.setState({ blocks: blocksBySlug() })
    } 
  }

  console.log(blocks, blocksBySlug())

  return (
    blocks?.length > 0 && (
      <div>
        <div style={{ marginRight: "20rem" }}>
          <Tree blocks={blocks} />
        </div>
        <Composer />
      </div>
    ) 
  );
};
export default Home;