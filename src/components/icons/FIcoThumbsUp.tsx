import { memo } from "react";
import { FiThumbsUp } from "react-icons/fi";
interface Props {
  attrs: any;
}
const FIcoThumbsUp: React.FC<Props> = memo(({ attrs, children }) => {
  return <><FiThumbsUp className={`block ${attrs.classes}`}/>{children}</>;
});
export default FIcoThumbsUp;