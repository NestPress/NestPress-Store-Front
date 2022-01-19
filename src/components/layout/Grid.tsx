import { memo } from "react";
import { parseBlockAttrs } from "helpers";
interface Props {
  attrs: any;
}
const Grid: React.FC<Props> = memo(({ attrs, children }) => {
  attrs = attrs.dataTarget ? parseBlockAttrs(attrs) : attrs;
  return <div className={`block ${attrs.classes}`}>{children}</div>;
});
export default Grid;
