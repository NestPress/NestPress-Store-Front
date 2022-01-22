/* TODO fix type */
// @ts-ignore
// @ts-nocheck

import { useQuery, gql } from '@apollo/client';
import { useApp, setToStore, pushToStore} from "store";
import { buildVariables, parseBlockAttrs } from "helpers"
import { useRouter, useHistory } from "next/router";


interface Props {
  attrs: any;
}
const Query: React.FC<Props> = ({ attrs, children }) => {
  attrs = parseBlockAttrs(attrs) 
  const router = useRouter()
  const slugPath = router.query?.slugPath || ["Page", "home"];
  const targeter = useApp((state) => state.custom.activeTargeter);
  const tick = useApp((state) => state.custom.tick);
  /* Query */
  try {
    if(attrs.query){
      const QUERY_GQL = gql `${attrs.query}`
      const res = {
        onCompleted(resData) {
          /* stated query result */
          setToStore({store:"queries", ref:`${attrs.refName || attrs.id}`, data:resData})  
          setToStore({
            store: "custom",
            ref: `tick`,
            data: Math.floor(Math.random() * 9999),
          });        
        }
      }
      attrs.variables ? res.variables = buildVariables(attrs.variables) : null
      const { queryLoading, queryError, data, refetch } = useQuery(QUERY_GQL, res);
    }
  } catch (error) { console.error('query error:',error) }

  return (
    <div 
      key={`${attrs.id}-${tick}`} 
      className={`block ${attrs.classes}`}>
    {targeter && <div 
      style={{textShadow:'0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff',background:`url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAHklEQVQYV2NkYGBgmDlz5v/09HRGRhgDJMgIImCyAN0lCs70MCQkAAAAAElFTkSuQmCC) repeat`}}
      className="p-1 text-black text-xs">Query ref: {attrs.refName}</div>}
    {children}
    </div>
  );
};
export default Query;
