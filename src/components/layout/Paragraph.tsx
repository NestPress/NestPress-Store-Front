interface Props {
  attrs: any;
}
const Paragraph: React.FC<Props> = ({ attrs }) => {
  const colspan = ["", "col-span-1", "col-span-2", "col-span-3", "col-span-4"];
  return (
    <p className={`grid ${attrs.colspan ? colspan[attrs.colspan] : null} `}>
      {attrs?.text}
    </p>
  );
};
export default Paragraph;
