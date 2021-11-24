import Image from 'next/image'
import { memo } from "react";
import { columns, colspan, rowspan } from "blogData/blockClasses";
interface Props {
  attrs: any;
}
const Img: React.FC<Props> = memo(({ attrs }) => {
  // Tailwind compile hack
  // const colspan = [
  //   '',
  //   'col-span-1',
  //   'col-span-2',
  //   'col-span-3',
  //   'col-span-4',
  // ]

  // const rowspan = [
  //   '',
  //   'row-span-1',
  //   'row-span-2',
  //   'row-span-3',
  //   'row-span-4',
  // ]



  return (
    <Image 
	    className={`
	      ${attrs.colspan ? colspan[attrs.colspan] : null} 
	      ${attrs.rowspan ? rowspan[attrs.rowspan] : null} 
	      ${attrs.border ? attrs.border : null} 
	      ${attrs.rounded ? attrs.rounded : null} 
	    `}
      
    	layout="fill" 
    	objectFit={attrs.objectfit}
    	src={ attrs.image || '/empty-person.svg' } 
    	alt={ attrs.alt } />
  );
});
export default Img;