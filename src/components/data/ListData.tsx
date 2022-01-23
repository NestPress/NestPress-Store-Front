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
  const targetedList = getFromStore(findStorage(attrs.dataTarget))
  return (
    <div className={`block ${attrs.classes}`}>
      {targetedList  && Array.isArray(targetedList) && targetedList.length > 1
        ? targetedList.map((el,i)=><>{children}</>)  
        : <div>{children}</div>}
    </div>
  );
});
export default ListData;

/*
const length = targetedList?.length
<div 
  className={`block ${attrs.classes}`}>
   {Array.isArray(targetedList) ? targetedList.map((el,i)=><>
    {(length-1 === i ) || !targeter ? children : <span key={i}
      className="p-1 m-px text-xs bg-pink-500 text-white">List el. {i}</span>}</>) : children}
</div>
*/


