/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import Link from "next/link";
import { memo } from "react";
import { useQueries } from "store";
import { parseBlockAttrs } from "components/blocks/helpers/blocks"
interface Props {
  attrs: any;
}
const NavLink: React.FC<Props> = ({ attrs, children }) => {
  attrs = attrs.dataTarget ? parseBlockAttrs(attrs, useQueries) : attrs
  return (
    <Link href={attrs.to}>
      <a className={`block items-center hover:underline ${attrs.classes}`}>
        <span>{attrs.title}</span> 
        {children}
      </a>
    </Link>
  );
};
export default NavLink;
