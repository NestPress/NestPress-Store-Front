import { memo } from "react";
import { FiHome } from "react-icons/fi";
interface Props {
  attrs: any;
}
const FIcoHome: React.FC<Props> = memo(({ attrs, children }) => {
  return <><FiHome className={`block ${attrs.classes}`}/>{children}</>;
});
export default FIcoHome;