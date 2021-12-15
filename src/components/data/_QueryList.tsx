import { useQuery, gql } from '@apollo/client';
import { get } from "helpers/io"
import { getNestedChildren } from "components/blocks/helpers/blocks"
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
