import Link from 'next/link'
interface Props {
  className?: string;
  to: string;
  asButton?: boolean;
}
export const NavLink: React.FC<Props> = ({  className, to, children, asButton }) => {
  const classString = asButton ? 'inline bg-blue-500 text-white bg-opacity-80 py-2 px-4 rounded border-b-2 border-gray-600 border-opacity-20' : 'hover:underline '
  return <Link href={to}><a className={`${classString} ${className} items-center`}>{children}</a></Link> 
};
