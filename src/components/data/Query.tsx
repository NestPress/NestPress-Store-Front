/* TODO fix type */
// @ts-ignore
// @ts-nocheck

import { useQuery, gql } from '@apollo/client';
import { useApp, setToStore, pushToStore} from "store";
import { buildVariables } from "components/blocks/helpers/blocks"
import { useRouter, useHistory } from "next/router";

interface Props {
  attrs: any;
}
const Query: React.FC<Props> = ({ attrs, children }) => {
  const router = useRouter()
  const slugPath = router.query?.slugPath || ["Page", "home"];
  const targeter = useApp((state) => state.custom.activeTargeter);

  /* Query */
  try {
    if(attrs.query){
      const QUERY_GQL = gql `${attrs.query}`
      const res = {
        onCompleted(resData) {
          /* stated query result */
          setToStore({store:"queries", ref:`${attrs.refName || attrs.id}`, data:resData})
          pushToStore({store:"display", ref:"blocks", data:{
            id:Math.floor(Math.random() * 9999),
            parentId:0,
            order:0,
            post:'specjalisci',
            block:"layout/Paragraph",
            attrs:{
              text:`active Query parser for block ${attrs.refName || attrs.id}`, 
              classes:"bg-green-400 p-2 text-white"
            }
          }})
        }
      }
      attrs.variables ? res.variables = buildVariables(attrs.variables) : null
      const { queryLoading, queryError, data, refetch } = useQuery(QUERY_GQL, res);
    }
  } catch (error) { console.error('query error:',error) }
  
  return (
    <div className={`block ${attrs.classes}`}>
    {targeter && <div className="p-1 bg-gray-600 text-white">QUERY {attrs.refName}</div>}
    {children}
    </div>
  );
};
export default Query;
