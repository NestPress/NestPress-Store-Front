/* TODO fix type */
// @ts-ignore
// @ts-nocheck

// https://www.npmjs.com/package/content-editable

import { memo } from "react";
import { parseBlockAttrs } from "helpers";
interface Props {
  attrs: any;
}
const Paragraph: React.FC<Props> = memo(({ attrs, children }) => {
  attrs = attrs.dataTarget ? parseBlockAttrs(attrs) : attrs;
  return (
    <p className={`block ${attrs.classes}`}>
      {attrs.text}
      {children}
    </p>
  );
});
export default Paragraph;
