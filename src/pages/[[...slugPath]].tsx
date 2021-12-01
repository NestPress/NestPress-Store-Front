/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { Composer, Tree } from "components/blocks";
import { useBlocks } from "store/blocksStore";
import { useStickyState , setItemToStorage } from "helpers/localMockupApi";
import { useRouter } from "next/router";
import { useEffect , useRef} from "react";
import { uid, getNestedChildren } from 'components/blocks/helpers/blocks'


const Home: React.FC = () => {

  const router = useRouter()
  const slugPath = router.query?.slugPath || ["Page","home"];

  const selectedBlockId = useBlocks((state) => state.selectedBlockId);
  const copiedBlocks = useBlocks((state) => state.copiedBlocks);
  const blocks = useBlocks((state) => state.blocks)?.filter((x) => x.post === slugPath[0]) || [];
  const addBlock = useBlocks((state) => state.addBlock);
  const blocksBySlug = () => [];
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
  if(blocks?.length === 0){
     blocksBySlug()?.length 
      ? blocksBySlug().map(el => { addBlock(el) }) 
      : starterBlocks.map(el => { addBlock(el) })
  }

  return (
    blocks?.length > 0 && (
      <div tabIndex="0">
        <div>
          <Tree blocks={blocks} />
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            router.push(`/composer/${slugPath[0]}/${slugPath[1]}`)
          }}
        >/composer</div>
      </div>
    ) 
  );
};
export default Home;