import { useQuery, gql } from '@apollo/client';
import { getNestedChildren, get } from "components/blocks/helpers/blocks"
import { useBlocks } from "store";
import { v4 as uuidv4 } from 'uuid';
interface Props {
  attrs: any;
}
const QueryList: React.FC<Props> = ({ attrs, children }) => {

  const blocks = useBlocks((state) => state.blocks);
  const addBlock = useBlocks((state) => state.addBlock);
  const nested = getNestedChildren(blocks, attrs.id)
  const copiedBlocks = nested.map(el=>el)

  /* Query */
  try {
    if(attrs.query && blocks.length){

      const QUERY = attrs.query ? gql`${attrs.query}` : ``;
      const { queryLoading, queryError, data, refetch } = useQuery(QUERY, {
        // variables: {},
        onCompleted(resData) {

          const queryList = attrs.dataTarget ? get(resData,attrs.dataTarget) : resData 
          const allBlocks = []

          for (const j in queryList) {
            const text = JSON.stringify(copiedBlocks)
            for (const i in copiedBlocks) {
              text = text.replaceAll(copiedBlocks[i].id, uuidv4())
            }
            const matches = text.match(/(?<=\$\{).+?(?=\})/g);
            for (const k in matches) {
              text = text.replaceAll('${'+matches[k]+'}', get(queryList[j],matches[k]))
            }
            if(j>0){allBlocks = [...allBlocks,...JSON.parse(text)]}
          }
          allBlocks.map( (el) => { addBlock(el) } )
        }
      });
    }
  } catch (error) { console.error('Form custom mutation:',error) }

  
  // console.log('children',children[1].props.blocks[8].attrs.text='dddddd')
  // console.log('children', children[1].props.blocks[8])
  
  return (
    <div className={attrs.classes}>
      {data.getPosts.list.map(el=><div>.</div>)}
      {children}
    </div>
  );
};
export default QueryList;





// import { useQuery, gql } from '@apollo/client';
// import { get, set } from "helpers/io"
// import { useQueries } from "store";
// interface Props {
//   attrs: any;
// }
// const QueryList: React.FC<Props> = ({ attrs, children }) => {
//   const addQuery = useQueries((state) => state.addQuery);
  
//   /* Build variables */
//   const buildVariables = (variables) => {
//     const out = {}
//     for (const [key, value] of Object.entries(variables)) {
//       set(out, value, key)
//     }
//     return out
//   }

//   /* Query */

//   try {
//     if(attrs.query){

//       const QUERY = gql `${attrs.query}`
//       const res = {
//         onCompleted(resData) {
//           /* stated query result */
//           addQuery({ref:attrs.refName || attrs.id, data:resData})
//         }
//       }
//       attrs.variables ? res.variables = buildVariables(attrs.variables) : null
//       const { queryLoading, queryError, data, refetch } = useQuery(QUERY, res);

//     }
//   } catch (error) { console.error('query:',error) }
//   const queryList = attrs?.dataTarget ? get(data, attrs.dataTarget) : data 
//   return (
//     <div className={attrs.classes}>
//       {queryList?.length ? queryList.map((el,i)=><>{children}</>):children}
//     </div>
//   );
// };
// export default QueryList;
