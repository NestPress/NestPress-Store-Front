interface Props {
  attrs: any;
}
const Breakpoints: React.FC<Props> = ({ children, attrs }) => {
  return (
    <div className={`block grid mx-auto w-full md:w-5/6 xl:w-4/6 ${attrs.classes}`}>{children}</div>
  );
};
export default Breakpoints;
