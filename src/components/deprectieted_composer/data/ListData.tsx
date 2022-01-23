/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { memo } from "react";
import { useBlocks, useQueries } from "store";
import { get } from "components/blocks/helpers/blocks";
interface Props {
  attrs: any;
}
const ListData: React.FC<Props> = memo(({ attrs, children }) => {
  const preview = useBlocks((state) => state.preview);
  const queries = useQueries((state) => state.queries);
  const targetedList = get(queries, attrs.dataTarget)
  const length = targetedList?.length
  console.log('targetedList',targetedList)
  return (
    <div className={`${attrs.classes}`}>
      {preview && <p>Preview</p>}
      {length ? targetedList.map((el,i)=><>
        {(length-1 === i || !preview) ? children : <div 
          className="border py-px my-px text-xs bg-white">List element {i}</div>}
      </>):children}
    </div>
  );
});
export default ListData;