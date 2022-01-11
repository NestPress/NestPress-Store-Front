import { memo } from "react";
interface Props {
  attrs: any;
}
const PlainData: React.FC<Props> = memo(({ attrs, children }) => {
  return (
    <div className={`block ${attrs.classes}`}>
      {children}
    </div>
  );
});
export default PlainData;