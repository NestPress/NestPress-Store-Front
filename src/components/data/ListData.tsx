/* TODO fix type */
// @ts-ignore
// @ts-nocheck

import { memo } from "react";
import { useApp, getFromStore } from "store";
import { getBy, findStorage } from "helpers";
interface Props {
  attrs: any;
}
const ListData: React.FC<Props> = memo(({ attrs, children }) => {
  const targeter = useApp((state) => state.custom.activeTargeter);
  const targetedList = getFromStore(findStorage(attrs.dataTarget))
  const length = targetedList?.length
  
  return (
    <div className={`block ${attrs.classes}`}>
       {Array.isArray(targetedList) ? targetedList.map((el,i)=><>
        {(length-1 === i ) || !targeter ? children : <span key={i}
          className="p-1 m-px text-xs bg-pink-500 text-white">List el. {i}</span>}</>):children}
    </div>
  );
});
export default ListData;



