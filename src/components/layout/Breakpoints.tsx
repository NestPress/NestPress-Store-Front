interface Props {
  attrs: any;
}
const Breakpoints: React.FC<Props> = ({ children, attrs }) => {
  return (
    <div className={`grid mx-auto w-full md:w-5/6 xl:w-4/6`}>{children}</div>
  );
};
export default Breakpoints;
