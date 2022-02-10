/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { FiStar } from "react-icons/fi";
import { getBy } from "helpers";
import { useApp } from "store";

interface Props {
  attrs: any;
}
const Stars: React.FC<Props> = ({  attrs, children }) => {
  
  const data = { queries: useApp((state) => state.queries) }
  // console.log('jojo', getBy( data, `${attrs.dataTarget}.${attrs.queryIndex - 1}`))
  
  const fill = (i:number) => i < (attrs.stars || 0) ? '#10b981' : '#eee'
  return (
    <div className={`flex mb-5 gap-x-0.5 ${attrs.classes}`}>
      {[...Array(5)].map((x, i) =>
        <FiStar key={i} fill={fill(i)} className="text-yellow-200" />
      )}
      <p className="text-xs text-gray-400 ml-1">20 opinions</p>
    </div>
  );
};
export default Stars;