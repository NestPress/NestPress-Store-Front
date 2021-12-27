import { memo } from "react";
interface Props {
  attrs: any;

}
const Grid: React.FC<Props> = memo(({ attrs,  children }) => {
  return (
    <div 
      className={`block ${attrs.classes}`} 
>
      {children}  
    </div>
  );
});
export default Grid;
