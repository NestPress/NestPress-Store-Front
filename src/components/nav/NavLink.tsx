import Link from "next/link";
import { shortcode } from "components/blocks/helpers/blocks"
import { useQueries } from "store";
interface Props {
  attrs: any;
}
const NavLink: React.FC<Props> = ({ attrs, children }) => {
  const queries = useQueries((state) => state.queries)?.[attrs.queryRef]?.[attrs.queryIndex-1];
  return (
    <Link href={typeof queries === 'object' ? shortcode('to', attrs, queries) : attrs.to}>
      <a className={`block items-center hover:underline ${attrs.classes}`}>
        {attrs.title ? <span>{typeof queries === 'object' ? shortcode('title', attrs, queries) : attrs.title}</span> : null}
        {children}
      </a>
    </Link>
  );
};
export default NavLink;
