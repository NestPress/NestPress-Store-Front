/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { useRouter } from "next/router"
import { useApp, getFromStore, setToStore, useBlocks } from "store";
interface Props {
  item: any;
  level: int;
  type: string
}
export const Targeter: React.FC<Props> = ({item, type, level = 0}) => {
  const panel = useBlocks((state) => state.panel);
  const router = useRouter();
  const r = getFromStore({store:"router",ref:"slugPath"})
  const targeter = getFromStore({store:"custom", ref:"activeTargeter"})

  const a = 'absolute w-full left-0',
        b = 'absolute h-full top-0' ,
        c = '0.5px dashed #00000020'
  
  const group = item.block.split("/");
  const cardColor = ['#404040','#707070']
  if(group[0] == 'layout'){
    cardColor = ['#1e40af','#3b82f6']
  }
  if(group[0] == 'data'){
    cardColor = ['#065f46','#10b981']
  }
  if(group[0] == 'form'){
    cardColor = ['#5b21b6','#8b5cf6']
  }

  const click = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    useBlocks.setState({ panel: "block"})
    setToStore({store:"custom",ref:`activeTargeter`, data:item})
    router.push(`${r.join('/')}#${item.id}`)
  }

  return (
    <>
      {(targeter?.id === item.id || targeter?.parentId === item.id) && <div 
        key={`b-${item.id}`}
        onClick={(e) => click(e, item)}
        className={`
          ${targeter.parentId == item.id ? "opacity-70" : null} 
          cursor-pointer absolute shadow text-white p-1 flex items-center text-xs block-edit-handler`}
        style={{
          border:'2px solid #000',
          boxShadow:'0 -2px 0 #fff, 2px -2px 0 #fff, -2px -2px 0 #fff',
          left:`${targeter.id === item.id ? 20 : 0}px`,
          zIndex:`${1000 + level}`,
          top:'-28px',
          backgroundColor: targeter.id === item.id ? cardColor[0] : cardColor[1],
        }}>{item.block.split('/')[1]}:{level}</div>}

      <div 
        key={`t-${item.id}`}
        className={`${a} ${b} bottom-0 right-0 cursor-pointer`}
        onClick={(e) => click(e, item)}
        style={{ 
          zIndex: 999, border:c, 
          outline: targeter?.id === item.id && '2px solid black',
          borderLeft: `${item.post == r[1] ? "7px solid #99eeee55" : item.attrs.handler ? "1px solid orange" : "none"}`,
          border: `${item.attrs.handler ? "1px solid orange" : "none"}`, 
        }}> 
      </div>
    </>  
  );
};
