/* TODO fix type */
// @ts-ignore
// @ts-nocheck

import { memo } from "react";
import { parseBlockAttrs } from "helpers";
interface Props {
  attrs: any;
}

const ParseDate: React.FC<Props> =memo(({ attrs, children }) => {
  // const enUS = new Intl.DateTimeFormat('en-US');
  attrs = attrs.dataTarget ? parseBlockAttrs(attrs) : attrs;
  return (
    <p className={`block ${attrs.classes}`}>
      !!!!!!!asdsadsadsad
      {children}
    </p>
  );
});
export default ParseDate;

// {enUS.format(new Date(attrs.text))}
