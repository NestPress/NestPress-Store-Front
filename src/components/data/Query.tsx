/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { memo, useEffect } from "react";
import { useQuery, gql } from '@apollo/client';
import { useApp, setToStore, pushToStore, getFromStore} from "store";
import { buildVariables, parseBlockAttrs,runCommands } from "helpers"
import { useRouter, useHistory } from "next/router";
import { useState } from "react";

interface Props {
  attrs: any;
}
const Query: React.FC<Props> = memo(({ attrs, children }) => {
  attrs = parseBlockAttrs(attrs) 
  const router = useRouter()
  const slugPath = router.query?.slugPath || ["Page", "home"];
  const targeter = useApp((state) => state.custom.activeTargeter);
  // const tick = useApp((state) => state.custom.tick);

  const [active, setActive] = useState(true);
  const [res, setRes] = useState({ skip:true });
  
  try{
    const QUERY_GQL = gql `${attrs.query}`
    const { data } = useQuery( QUERY_GQL, res );  
    let reinitAttrs;
    if(active && attrs?.initActions && attrs?.initActions?.length>0){ 
      // TODO
      // check set two customTypes actions to one filter. One shouldbe real and second fake
      runCommands(attrs.initActions, router, attrs);
      reinitAttrs = getFromStore({store:"display", ref:`blocks.${attrs.index}.attrs`})
    }
    useEffect(() =>{
      setRes({
        skip: false,
        variables: reinitAttrs?.variables,
        onCompleted: (data) => {
          setToStore({store:"queries", ref:`${attrs.refName || attrs.id}`, data:data}) 
          console.log('ok')
        }});
    }, [reinitAttrs])
  }catch(e){}

  return (
    <div 
      onClick={()=>{console.log(attrs)}}
      // key={`${attrs.id}-${tick}`} 
      className={`block ${attrs.classes}`}>
    {targeter && <div 
      style={{textShadow:'0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff',background:`url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAHklEQVQYV2NkYGBgmDlz5v/09HRGRhgDJMgIImCyAN0lCs70MCQkAAAAAElFTkSuQmCC) repeat`}}
      className="p-1 text-black text-xs">Query ref: {attrs.refName}</div>}
    {children}
    </div>
  );
});
export default Query;
