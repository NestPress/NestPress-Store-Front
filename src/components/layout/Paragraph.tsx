/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { memo } from "react";
import { useQueries } from "store";
import { get, set, parseBlockAttrs } from "helpers"
interface Props {
  attrs: any;
}
const Paragraph: React.FC<Props> = memo(({ attrs, children }) => {
  
  
  attrs = attrs.dataTarget ? parseBlockAttrs(attrs, useQueries) : attrs
 
  return (
    <p className={`block ${attrs.classes}`}>
      {attrs.text}
      {children}  
    </p>
  );
});
export default Paragraph;
