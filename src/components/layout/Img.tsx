import Image from 'next/image'
import { memo } from "react";
import { columns, colspan, rowspan } from "blogData/blockClasses";
interface Props {
  attrs: any;
}
const Img: React.FC<Props> = memo(({ attrs,  children }) => {
  return (
    <div className={`block ${attrs.classes}`}>
      <Image 
      	layout={attrs.imglayout ? attrs.imglayout : "fill"}
      	objectFit={attrs.objectfit}
        width={attrs.width ? attrs.width : 0}
        height={attrs.height ? attrs.height : 0}
      	src={ attrs.image || '/empty-person.svg' } 
      	alt={ attrs.alt } />
        {children}  
    </div>
  );
});
export default Img;