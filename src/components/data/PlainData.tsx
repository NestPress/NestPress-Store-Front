import { memo } from "react";
import { useBlocks, useQueries } from "store";
import { get } from "helpers/io";
interface Props {
  attrs: any;
}
const PlainData: React.FC<Props> = memo(({ attrs, children }) => {
 
  const queries = useQueries((state) => state.queries);
  // const targetedList = get(queries, attrs.dataTarget)
  console.log('attrs.dataTarget',attrs.dataTarget)
  return (
    <div className={`${attrs.classes}`}>
      {children}
    </div>
  );
});
export default PlainData;