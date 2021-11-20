interface Props {
  attrs: any
}
const Grid: React.FC<Props> = ({ attrs, children }) => {
  return (
    <div>{children}</div>
  );
};
export default Grid