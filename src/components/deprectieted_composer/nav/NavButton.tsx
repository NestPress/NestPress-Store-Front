import Link from "next/link";
interface Props {
  attrs: any;
}
const NavButton: React.FC<Props> = ({ attrs, children }) => {
  return (
    <Link href={attrs.to}>
      <a className={`block border px-4 py-2 rounded items-center bg-white hover:underline ${attrs.classes}`}>
        {attrs.title ? <span>{attrs.title}</span> : null}
        {children}
      </a>
    </Link>
  );
};
export default NavButton;