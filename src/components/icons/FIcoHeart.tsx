import { memo } from "react";
import { FiHeart } from "react-icons/fi";
interface Props {
  attrs: any;
}
const FIcoHeart: React.FC<Props> = memo(({ attrs, children }) => {
  return <><FiHeart className={`block ${attrs.classes}`}/>{children}</>;
});
export default FIcoHeart;