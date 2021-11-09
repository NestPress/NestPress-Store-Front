
interface Props {
  label?: string;
  placeholder?: string;
  value?: string;
  className?: string;
}
export const Button: React.FC<Props> = ({ label, value, placeholder, children, className }) => {
  return (
	<button className={`flex items-center border-b-2 border-gray-600 border-opacity-20 action-background text-white px-5 py-2 rounded-sm w-full ${className}`}>{children}</button>
  );
};

