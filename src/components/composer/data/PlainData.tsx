import { memo } from "react";
interface Props {
  attrs: any;
}
const PlainData: React.FC<Props> = memo(({ attrs, children }) => {
  return (
    <div className={`${attrs.classes}`}>
      {children}
    </div>
  );
});
export default PlainData;