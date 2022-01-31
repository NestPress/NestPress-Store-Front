/* TODO fix type */
// @ts-ignore
// @ts-nocheck

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { memo } from "react";
import { parseBlockAttrs } from "helpers"
import { format, subDays, setHours, setMinutes } from 'date-fns'
import { pl } from 'date-fns/locale'
interface Props {
  attrs: any;
}
const MiniTermSchedule: React.FC<Props> = memo(({ attrs,  children }) => {
  
  const formatted = (
    d=0,
    f='iii dd MMMM yyyy HH:mm',
    o=null
    ) => format(subDays(new Date(o), d), f, {locale: pl});
  const rows = [0,-1,-2,-3,-4]
  const dataNodes = []
  const timeStep = 2 // hour/timeStep
  let counter = 0
  let wawe = 1
  for (let step = 0; step < rows.length*5; step++) {
    counter++;
    if(counter > 5){
      wawe = wawe * -1
      counter = 1
    }
    const columns = Math.floor((step/timeStep)/(rows.length))
    dataNodes.push({
      el: '-',
      d: (step % rows.length)*-1,
      s: wawe,
      t: formatted((step % rows.length)*-1,'dd MMMM yyyy',new Date()),
      h: formatted(0,'HH:mm',
          setMinutes(
            setHours(
              new Date(), columns + 7
            ), wawe == -1 ? 30 : 0
          )
        ) 
    })
  }

  const getTerm = (el) => {
    alert(el.t)
  }

  return (
    <div className={`block flex ${attrs.classes}`}>
{/*      {format(new Date(), 'MM/dd/yyyy HH')}*/}
     
      
      <div className="grid grid-cols-5 text-center"> 
        {rows.map((el,i)=><div className="p-1">
          <div>{formatted(el,'iii',new Date())}</div>
          <div className="text-xs">{formatted(i*-1,'MM/dd',new Date())}</div>
        </div>)} 
        {dataNodes.map(el=><div 
          onClick={e=>getTerm(el)}
          className="py-1 px-2 cursor-pointer text-indigo-400 hover:bg-gray-50">{el.h}</div>)} 
      </div>


      

      {children}  
    </div>
  );
});
export default MiniTermSchedule;



// <div>
//         <div className="p-2 bg-blue-100 rounded-2xl h-min cursor-pointer">
//           <FiChevronLeft className=" "/>
//         </div>
//       </div>
//       <div className="grid grid-cols-4 items-center justify-between text-xs text-center flex-1 gap-2">
//         <div className="pb-1">
//           <div className="text-sm">Dziś</div>
//           <div className="text-gray-400">10 Paź</div>
//         </div>
//         <div className="pb-1">
//           <div className="text-sm">Jutro</div>
//           <div className="text-gray-400">10 Paź</div>
//         </div>
//         <div className="pb-1">
//           <div className="text-sm">Wt</div>
//           <div className="text-gray-400">10 Paź</div>
//         </div>
//         <div className="pb-1">
//           <div className="text-sm">Śr</div>
//           <div className="text-gray-400">10 Paź</div>
//         </div>

       
//         <div className="text-gray-400">-</div>
//         <div className="text-blue-600 border py-1 rounded bg-blue-100">10:45</div>
//         <div className="text-blue-600 border py-1 rounded bg-blue-100">14:00</div>
//         <div className="text-gray-400">-</div>

//         <div className="text-gray-400">-</div>
//         <div className="text-gray-400">-</div>
//         <div className="text-gray-400">-</div>
//         <div className="text-gray-400">-</div>

//         <div className="text-blue-600 border py-1 rounded bg-blue-100">10:45</div>
//         <div className="text-blue-600 border py-1 rounded bg-blue-100">14:00</div>

       
//       </div>
//      <div>
//         <div className="p-2 bg-blue-100 rounded-2xl h-min cursor-pointer">
//           <FiChevronRight className=" "/>
//         </div>
//       </div>