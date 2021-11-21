import Link from "next/link";
interface Props {
  attrs: any;
}
const NavLink: React.FC<Props> = ({ attrs, children }) => {
  const classString = attrs.asButton
    ? "inline bg-blue-500 text-white bg-opacity-80 py-2 px-4 rounded border-b-2 border-gray-600 border-opacity-20"
    : "hover:underline ";
  return (
    <Link href={attrs.to}>
      <a className={`${classString} items-center`}>
        {attrs.title ? <span>{attrs.title}</span> : null}
        {children}
      </a>
    </Link>
  );
};
export default NavLink;
