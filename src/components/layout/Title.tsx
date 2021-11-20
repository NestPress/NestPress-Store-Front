interface Props {
  attrs: any
}
const Title: React.FC<Props> = ({ attrs }) => {
  return (
    <h1 className="font-bold">{attrs?.text}</h1>
  );
};
export default Title