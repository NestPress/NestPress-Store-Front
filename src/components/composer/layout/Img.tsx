import Image from 'next/image'
import { memo } from "react";
interface Props {
  attrs: any;
}
const Img: React.FC<Props> = memo(({ attrs,  children}) => {
  return (
    <div>
      <Image 
  	    className={`
  	      ${attrs.colspan ? colspan[attrs.colspan] : null} 
  	      ${attrs.rowspan ? rowspan[attrs.rowspan] : null} 
  	      ${attrs.border ? attrs.border : null} 
  	      ${attrs.rounded ? attrs.rounded : null} 
  	    `}
        
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