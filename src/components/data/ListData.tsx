import { memo } from "react";
import { useBlocks, useQueries } from "store";
import { get } from "helpers/io";
interface Props {
  attrs: any;
}
const ListData: React.FC<Props> = memo(({ attrs, children }) => {
  const preview = useBlocks((state) => state.preview);
  const queries = useQueries((state) => state.queries);
  const targetedList = get(queries, attrs.dataTarget)
  const length = targetedList?.length
  return (
    <div className={`${attrs.classes}`}>
      {length ? targetedList.map((el,i)=><>
        {(length-1 === i || !preview) ? children : <div 
          className="border py-px my-px text-xs bg-white">List element {i}</div>}
      </>):children}
    </div>
  );
});
export default ListData;