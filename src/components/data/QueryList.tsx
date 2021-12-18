import { useQuery, gql } from '@apollo/client';
import { get, set } from "helpers/io"
import { useQueries } from "store";
import { buildVariables } from "components/blocks/helpers/blocks"

interface Props {
  attrs: any;
}
const QueryList: React.FC<Props> = ({ attrs, children }) => {
  const addQuery = useQueries((state) => state.addQuery);
  
  /* Query */

  try {
    if(attrs.query){

      const QUERY = gql `${attrs.query}`
      const res = {
        onCompleted(resData) {
          /* stated query result */
          addQuery({ref:attrs.refName || attrs.id, data:queryList})
        }
      }
      attrs.variables ? res.variables = buildVariables(attrs.variables) : null
      const { queryLoading, queryError, data, refetch } = useQuery(QUERY, res);
      const queryList = attrs?.dataTarget ? get(data, attrs.dataTarget) : data 
    }
  } catch (error) { console.error('query:',error) }
  
  return (
    <div className={attrs.classes}>
      {queryList?.length ? queryList.map((el,i)=><>{children}</>):children}
    </div>
  );
};
export default QueryList;
