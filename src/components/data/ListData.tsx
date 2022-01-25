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
  const mutationTick = useApp((state) => state.custom.mutationTick);
  return (
    <div className={`block ${attrs.classes}`}>
      {targetedList  && Array.isArray(targetedList) && targetedList.length > 1
        ? targetedList.map((el,i)=><>{children}</>)  
        : <>{children} </>}
    </div>
  );
});
export default ListData;



