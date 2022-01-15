/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { memo } from "react";
import { useQuery, gql } from '@apollo/client';
import { useQueries } from "store";
import { buildVariables, get, set  } from "components/blocks/helpers/blocks"
import { useRouter, useHistory } from "next/router";

interface Props {
  attrs: any;
}
const QueryList: React.FC<Props> = memo(({ attrs, children }) => {
  const addQuery = useQueries((state) => state.addQuery);
  const router = useRouter()
  const slugPath = router.query?.slugPath || ["Page", "home"];
  
  /* Query */

  try {
    if(attrs.query){

      const QUERY = gql `${attrs.query}`
      const res = {
        onCompleted(resData) {
          console.log('resData',resData)
          /* stated query result */
          addQuery({ref:attrs.refName || attrs.id, data:queryList})
          /* hack to rerender after first loading */
          router.push(`${slugPath[0]}/${slugPath[1]}/${Math.floor(Math.random() * 9999)}`)
        }
      }
      attrs.variables ? res.variables = buildVariables(attrs.variables) : null
      const { queryLoading, queryError, data, refetch } = useQuery(QUERY, res);
      const queryList = attrs?.dataTarget ? get(data, attrs.dataTarget) : data 
    }
  } catch (error) { console.error('query:',error) }
  
  return (
    <div className={`${attrs.classes}`}>
      {queryList?.length ? queryList.map((el,i)=><div key={i}>{children}</div>):children}
    </div>
  );
});
export default QueryList;
