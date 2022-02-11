import { memo } from "react";
import { FiUserPlus } from "react-icons/fi";
interface Props {
  attrs: any;
}
const FIcoUserPlus: React.FC<Props> = memo(({ attrs, children }) => {
  return <><FiUserPlus className={`block ${attrs.classes}`}/>{children}</>;
});
export default FIcoUserPlus;