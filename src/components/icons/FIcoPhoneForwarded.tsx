import { memo } from "react";
import { FiPhoneForwarded } from "react-icons/fi";
interface Props {
  attrs: any;
}
const FIcoPhoneForwarded: React.FC<Props> = memo(({ attrs, children }) => {
  return <><FiPhoneForwarded className={`block ${attrs.classes}`}/>{children}</>;
});
export default FIcoPhoneForwarded;