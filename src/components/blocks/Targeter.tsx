import { useBlocks } from "store/blocksStore";

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
  return (
    <>

    { !preview && type == 'tab' &&
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
      {!preview && <><div 
        onClick={(e) => {
          e.stopPropagation();
          if(!item.cloneIndex){
            if (!replace) {
              setBlock(item.id);
              useBlocks.setState({ panel: "block", composerTab: null });
            } 
          }
        }}
        className="block-edit-handler"
        style={{
          fontSize:'12px',
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          color:'#fff',
          cursor:'pointer',
          position:'absolute',
          width:'24px',
          height:'26px',
          borderTop:'1px solid #00000040',
          borderLeft:'1px solid #00000040',
          borderRight:'1px solid #00000040',
          left:`${level*24}px`,
          boxShadow:'0 0 3px #00000020',
          top:'-26px',
          borderRadius: '6px 6px 0 0',
          backgroundColor: selectedBlockId === item.id ? '#00000090' : '#00000030',
          // backgroundImage: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAMElEQVQYV2NkQADj////z2RkZDRhhIrBBUB8kCCKAFjw////Z0BakI2BaYeJgXUBAB/FFAI+hBjAAAAAAElFTkSuQmCC)`,
          // backgroundRepeat: 'repeat',
        }}>{level}</div>
       {!preview && <div
        style={{ top: "-18px", right: "3px", zIndex: 1000, background: '#404040' }}
        className={`absolute text-xs text-white p-1 ${
          selectedBlockId == item.id ? "visible" : "invisible"
        }`}
      >
        {item.block}
      </div>}
      </>
      }
    </>
    } 

    { !preview && type == 'layer' &&  <div 
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
        style={{position:"absolute", width:"100%", height:'100%',top:0,left:0 }}>
      </div>
    }

    </>  
    
  );
};
