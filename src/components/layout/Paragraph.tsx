import { useBlocks, useQueries } from "store";
import { findOutByBlock } from "components/blocks/helpers/blocks"
import { get } from "helpers/io"
interface Props {
  attrs: any;
}
const Paragraph: React.FC<Props> = ({ attrs }) => {
  
  /* Dirty parser */
  /* workaround sollution to indexing childrens with queryList blocks */
  /* TODO - better method is copying blocks  */
  const queries = useQueries((state) => state.queries);
  const blocks = useBlocks((state) => state.blocks);
  const filteredAttrs = attrs
  try {
    filteredAttrs = JSON.stringify(filteredAttrs)
    const matches = filteredAttrs.match(/(?<=\$\{).+?(?=\})/g);
    if(matches.length){
      const queryRef = findOutByBlock(blocks, attrs.id, 'data/QueryList')
      const dataPart = get(queries[queryRef.id], queryRef.attrs.dataTarget)[attrs.queryIndex]
      for (const k in matches) {
        filteredAttrs = filteredAttrs.replaceAll('${'+matches[k]+'}', get(dataPart, matches[k]))
      }
    } 
    filteredAttrs = JSON.parse(filteredAttrs)
  } catch (error) {
    filteredAttrs = attrs
  }
  
  return (
    <p className={filteredAttrs?.classes}>
      {filteredAttrs?.text}
    </p>
  );
};
export default Paragraph;
