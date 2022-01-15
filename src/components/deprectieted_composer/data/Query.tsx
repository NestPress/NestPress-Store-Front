/* TODO fix type */
// @ts-ignore
// @ts-nocheck

import { useQuery, gql } from '@apollo/client';
import { useQueries,useBlocks } from "store";
import { buildVariables } from "components/blocks/helpers/blocks"
import { useRouter, useHistory } from "next/router";

interface Props {
  attrs: any;
}
const Query: React.FC<Props> = ({ attrs, children }) => {
  const addQuery = useQueries((state) => state.addQuery);
  const router = useRouter()
  const slugPath = router.query?.slugPath || ["Page", "home"];
  const addBlock = useBlocks((state) => state.addBlock);
  
  /* Query */
  try {
    if(attrs.query){
      const QUERY_GQL = gql `${attrs.query}`
      const res = {
        onCompleted(resData) {
          /* stated query result */
          addQuery({ref:attrs.refName || attrs.id, data:resData})
          
          addBlock({
            id:Math.floor(Math.random() * 9999),
            parentId:0,
            order:0,
            post:slugPath[1],
            block:"layout/Paragraph",
            attrs:{
              text:`active Query parser for block ${attrs.refName || attrs.id}`, 
              classes:"bg-green-400 p-2 text-white"}
            })
          

          /* hack to rerender after first loading */
          // router.push(`${slugPath[0]}/${slugPath[1]}/${Math.floor(Math.random() * 9999)}`)
          // console.log()
        }
      }
      attrs.variables ? res.variables = buildVariables(attrs.variables) : null
      console.log('variables', QUERY_GQL, res)
      const { queryLoading, queryError, data, refetch } = useQuery(QUERY_GQL, res);
    }
  } catch (error) { console.error('query error:',error) }
  
  return (
    <div className={`block ${attrs.classes}`}>
      {children}
    </div>
  );
};
export default Query;
