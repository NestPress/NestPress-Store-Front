import { memo } from "react";
interface Props {
  attrs: any;
}
const Breakpoints: React.FC<Props> = memo(({ attrs,  children }) => {
  return (
    <div className={`block mx-auto w-full md:w-5/6 xl:w-4/6 ${attrs.classes}`}>
      {children}  
    </div>
  );
});
export default Breakpoints;
