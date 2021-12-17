import Link from "next/link";
interface Props {
  attrs: any;
}
const NavLink: React.FC<Props> = ({ attrs, children }) => {
  return (
    <Link href={attrs.to}>
      <a className={`items-center hover:underline ${attrs.classes}`}>
        {attrs.title ? <span>{attrs.title}</span> : null}
        {children}
      </a>
    </Link>
  );
};
export default NavLink;
