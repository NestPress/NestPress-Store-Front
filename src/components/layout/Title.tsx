/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { memo } from "react";
import { parseBlockAttrs } from "helpers"
interface Props {
  attrs: any;
}

const Title: React.FC<Props> = memo(({ attrs, children }) => {
  attrs = attrs.dataTarget ? parseBlockAttrs(attrs) : attrs
  return (<h1 className={`block ${attrs.classes}`}> {attrs.text} {children}</h1>);
});
export default Title;
