import { memo } from "react";
interface Props {
  attrs: any;
}
const Title: React.FC<Props> = memo(({ attrs }) => {
  return (
    <h1
      className={`font-bold ${attrs.classes}`}
    >
       {attrs?.text}
    </h1>
  );
});
export default Title;
