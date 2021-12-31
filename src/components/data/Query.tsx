/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { memo } from "react";
import { useQuery, gql } from '@apollo/client';
import { get, set } from "helpers/io"
import { useQueries } from "store";
import { buildVariables } from "components/blocks/helpers/blocks"
import { useRouter, useHistory } from "next/router";

interface Props {
  attrs: any;
}
const Query: React.FC<Props> = memo(({ attrs, children }) => {
  const addQuery = useQueries((state) => state.addQuery);
  const router = useRouter()
  const slugPath = router.query?.slugPath || ["Page", "home"];
  
  /* Query */

  try {
    if(attrs.query){

      const QUERY_GQL = gql `${attrs.query}`
      const res = {
        onCompleted(resData) {
          /* stated query result */
          addQuery({ref:attrs.refName || attrs.id, data:resData})
          /* hack to rerender after first loading */
          router.push(`${slugPath[0]}/${slugPath[1]}/${Math.floor(Math.random() * 9999)}`)
        }
      }
      attrs.variables ? res.variables = buildVariables(attrs.variables) : null
      const { queryLoading, queryError, data, refetch } = useQuery(QUERY_GQL, res);
    }
  } catch (error) { console.error('query error:',error) }
  
  return (
    <div className={`${attrs.classes}`}>
      {children}
    </div>
  );
});
export default Query;
