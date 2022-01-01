import { useBlocks, useQueries } from "store";
import { FiChevronDown,  FiChevronUp} from "react-icons/fi";
import { JsonView } from "components/blocks";
import { get, set } from "helpers/io"

interface Props {
  item: any;
  level: int;
  type: string
}
export const Targeter: React.FC<Props> = ({item, level, type}) => {
  
  const selectedBlockId = useBlocks((state) => state.selectedBlockId);
  const setBlock = useBlocks((state) => state.setBlock);
  const replace = useBlocks((state) => state.replace);
  const preview = useBlocks((state) => state.preview);
  const queries = useQueries((state) => state.queries);


  const tagretedQuery = queries && item.attrs.dataTarget && get(queries, item.attrs.dataTarget)
  tagretedQuery?.length ? tagretedQuery = {listElement:tagretedQuery[0]} : null
  // check is parent element is list

  const group = item.block.split("/");
  const cardColor = ['#404040','#707070']
  if(group[0] == 'layout'){
    cardColor = ['#1e40af','#3b82f6']
  }
  if(group[0] == 'data'){
    cardColor = ['#065f46','#10b981']
  }

  return (
    <>

    { preview && type == 'tab' &&
    <>
      <div
        style={{ top: "-1px", left: "-1px", zIndex: 998, outline:"0.5px dashed #00000090", width:"100%" }}
        className={`absolute ${
          selectedBlockId == item.id ? "visible" : "invisible"
        }`}
      ></div>
      <div
        style={{ bottom: "-1px", left: "-1px", zIndex: 998, outline:"0.5px dashed #00000090", width:"100%" }}
        className={`absolute ${
          selectedBlockId == item.id ? "visible" : "invisible"
        }`}
      ></div>
      <div
        style={{ top: "-1px", right: "-1px", zIndex: 998, outline:"0.5px dashed #00000090", height:"100%" }}
        className={`absolute ${
          selectedBlockId == item.id ? "visible" : "invisible"
        }`}
      ></div>
      <div
        style={{ top: "-1px", left: "-1px", zIndex: 998, outline:"0.5px dashed #00000090", height:"100%" }}
        className={`absolute ${
          selectedBlockId == item.id ? "visible" : "invisible"
        }`}
      ></div>
      {preview && <><div 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if(!item.cloneIndex){
            if (!replace) {
              setBlock(item.id);
              useBlocks.setState({ panel: "block", composerTab: null });
            } 
          }
        }}
        className={`block-edit-handler ${selectedBlockId == item.id ? "forced-visible" : null}`}
        style={{
          fontSize:'12px',
          display:'flex',
          alignItems:'center',
          justifyContent:'flex-end',
          textAlign:'right',
          padding:'5px',
          color:'#fff',
          cursor:'pointer',
          position:'absolute',
          width:'40px',
          height:'26px',
          borderTop:'1px solid #00000040',
          borderLeft:'1px solid #00000040',
          borderRight:'1px solid #00000040',
          left:`${level*14}px`,
          zIndex:`${level*1000}`,
          boxShadow:'0 0 3px #00000020',
          top:'-26px',
          borderRadius: '6px 6px 0 0',
          backgroundColor: selectedBlockId === item.id ? cardColor[0] : cardColor[1],
          // backgroundImage: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAMElEQVQYV2NkQADj////z2RkZDRhhIrBBUB8kCCKAFjw////Z0BakI2BaYeJgXUBAB/FFAI+hBjAAAAAAElFTkSuQmCC)`,
          // backgroundRepeat: 'repeat',
        }}>{level}</div>
       {preview && <div
        style={{ top: "-18px", right: "3px", zIndex: 1000, background: '#404040', borderRadius:'4px' }}
        className={`absolute text-xs text-white py-1 px-2 ${
          selectedBlockId == item.id ? "visible" : "invisible"
        }`}
      >
        {item.block}
      </div>}
      </>
      }
    </>
    } 

    { preview && type == 'layer' &&  <div 
         onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if(!item.cloneIndex){
            if (!replace) {
              setBlock(item.id);
              useBlocks.setState({ panel: "block", composerTab: null });
            } 
          }
        }}
        style={{position:"absolute", width:"100%", height:'100%',top:0,left:0, zIndex: 998, }}>
      </div>
    }


    {preview && selectedBlockId == item.id && (item.block === 'data/ListData' || item.block === 'data/PlainData') && type == 'layer' && <div 
      style={{
        position:'absolute',
        right:'0',
        bottom:'-260px',
        background:'#fefefe',
        boxShadow:'0 0 3px #00000020',
        borderRadius: '4px',
        border:'1px solid #bbb',
        fontSize:'12px',
        padding:'3px 10px',
        width:'300px',
        height:'250px',
        overflowY:'scroll',
        zIndex: 998,
      }}>
        
          <div className="flex items-center cursor-pointer">Targeted data <span><FiChevronDown/></span></div>
          {tagretedQuery && <div className="border p-1 mt-2">{item.attrs.dataTarget}</div>}
          {tagretedQuery && <JsonView data={tagretedQuery} />}
          {!tagretedQuery && <div className="mt-2">Nonting find! <br/>Set datatarget on block attributes</div>}
   
      </div>}

    </>  
    
  );
};
