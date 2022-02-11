import { memo } from "react";
import { FiAlertCircle } from "react-icons/fi";
interface Props {
  attrs: any;
}
const FIcoAlertCircle: React.FC<Props> = memo(({ attrs, children }) => {
  return <><FiAlertCircle className={`block ${attrs.classes}`}/>{children}</>;
});
export default FIcoAlertCircle;