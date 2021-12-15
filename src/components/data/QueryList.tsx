import { useQuery, gql } from '@apollo/client';
import { get } from "helpers/io"
import { useQueries } from "store";
interface Props {
  attrs: any;
}
const QueryList: React.FC<Props> = ({ attrs, children }) => {
  const addQuery = useQueries((state) => state.addQuery);
  /* Query */
  try {
    if(attrs.query){
      const QUERY = attrs.query ? gql`${attrs.query}` : ``;
      const { queryLoading, queryError, data, refetch } = useQuery(QUERY, {
        // variables: {},
        onCompleted(resData) {
          // setBlockAttrs({key:"resData",value:resData, id:attrs.id})
          addQuery({ref:attrs.refName || attrs.id, data:resData})
        }
      });
    }
  } catch (error) { console.error('Form custom mutation:',error) }
  const queryList = attrs?.dataTarget ? get(data, attrs.dataTarget) : data 
  return (
    <div className={attrs.classes}>
      {queryList?.length ? queryList.map((el,i)=><>{children}</>):children}
    </div>
  );
};
export default QueryList;
