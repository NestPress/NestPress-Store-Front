/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { FiFile } from "react-icons/fi";
import { Composer, Tree } from "components/blocks";
import { useBlocks } from "store/blocksStore";
import { useStickyState, setItemToStorage, getPageBySlug } from "helpers/localMockupApi";
import { useRouter } from "next/router";
import { useEffect , useRef} from "react";
import { uid, getNestedChildren } from 'components/blocks/helpers/blocks'


const ComposerPage: React.FC = () => {

  const selectedBlockId = useBlocks((state) => state.selectedBlockId);
  const copiedBlocks = useBlocks((state) => state.copiedBlocks);
  const router = useRouter();
  const slugPath = router.query?.slugPath || ["home"];
  const blocks = useBlocks((state) => state.blocks)?.filter((x) => x.post === slugPath[0]) || [];
  const addBlock = useBlocks((state) => state.addBlock);

  const keysHandler = (e) => {
    // e = e || window.event; 
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
      
   

  // ----
  const [ storageBlocks, setStorageBlocks ] = useStickyState([], 'storageBlocks');
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

  if(blocks?.length === 0){
     blocksBySlug()?.length 
      ? blocksBySlug().map(el => { addBlock(el); setItemToStorage(el, storageBlocks, setStorageBlocks, 'id') }) 
      : starterBlocks.map(el => { addBlock(el);  setItemToStorage(el, storageBlocks, setStorageBlocks, 'id') })
  }

  /* Data loader localstorage */
  const [ storagePosts, setStoragePosts ] = useStickyState([], 'storagePosts');
  const currentPage = getPageBySlug(slugPath[0], storagePosts);

  return (
    blocks?.length > 0 ? (
      <div tabIndex="0" onKeyDown={keysHandler}>

        <div style={{ marginRight: "20rem" }}>
          <div className="font-bold text-gray-500 border-b border-gray-400 p-2 bg-blue-100 mb-0.5 flex items-center">
            <FiFile/><span key={router.asPath} className="ml-1">{currentPage?.title || slugPath[1]}</span>
          </div>
          <div className="pr-px">
            { slugPath[1] && <Tree blocks={blocks} /> }
          </div>
        </div>
        <Composer />
      </div>
    ) : null
  );
};
export default ComposerPage;