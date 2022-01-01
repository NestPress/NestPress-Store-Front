import { memo } from "react";
interface Props {
  attrs: any;
}
const Grid: React.FC<Props> = ({ attrs,  children }) => {
  return (
    <div className={`${attrs.classes}`}>
      {children}  
    </div>
  );
};
export default Grid;