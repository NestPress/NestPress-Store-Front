interface Props {
  className?: string;
}
export const Breakpoints: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={`mx-auto w-full md:w-5/6 xl:w-4/6 ${className}`}>{children}</div>
  );
};