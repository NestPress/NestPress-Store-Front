import { memo } from 'react'
import {columns, colspan, rowspan} from 'blogData/blockClasses'
interface Props {
  attrs: any
}
const Grid: React.FC<Props> = memo( ({ attrs, children }) => {
  
  // Tailwind compile hack
  // const columns = [
  //   '',
  //   'grid-cols-1',
  //   'grid-cols-2',
  //   'grid-cols-3',
  //   'grid-cols-4',
  //   'grid-cols-5',
  //   'grid-cols-6'
  // ]

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
    <div className={`
      grid  
      ${attrs.columns ? columns[attrs.columns] : null}  
      ${attrs.colspan ? colspan[attrs.colspan] : null} 
      ${attrs.rowspan ? rowspan[attrs.rowspan] : null} 
    `}>
      <div className={`absolute ${attrs.background} inset-0 z-0`}></div> 
      {children}
    </div>
  );
});
export default Grid