import { memo } from "react";
interface Props {
  attrs: any;
}
const Grid: React.FC<Props> = memo(({ attrs, children }) => {
  return (
    <div className={attrs.classes}>

      {children} 
      
    </div>
  );
});
export default Grid;
