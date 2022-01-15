/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import Link from "next/link";
import { memo } from "react";
import { parseBlockAttrs } from "helpers"
interface Props {
  attrs: any;
}
const NavLink: React.FC<Props> = memo(({ attrs, children }) => {
  attrs = attrs.dataTarget ? parseBlockAttrs(attrs) : attrs
  return (
    <Link href={attrs.to}>
      <a className={`block items-center hover:underline ${attrs.classes}`}>
        {attrs.title ? <span>{attrs.title}</span> : null}
        {children}
      </a>
    </Link>
  );
});
export default NavLink;
