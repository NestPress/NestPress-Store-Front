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
    alert('Rezerwacja na:'+el.t+', godz:'+el.h)
  }

  return (
    <div className={`block ${attrs.classes}`}>
      <div className={`text-center font-bold`}>Wolne terminy</div>
      <div className={`flex gap-2`}>
        {/*{format(new Date(), 'MM/dd/yyyy HH')}*/}
        <div className="mt-2 text-gray-400"><FiChevronLeft/></div>
        <div className="grid grid-cols-5 text-center gap-1"> 
          {rows.map((el,i)=><div className="p-1">
            <div>{formatted(el,'iii',new Date())}</div>
            <div className="text-xs text-gray-500">{formatted(i*-1,'MM/dd',new Date())}</div>
          </div>)} 
          {dataNodes.map(el=><div 
            onClick={e=>getTerm(el)}
            className="py-1 px-2 m-px text-xs cursor-pointer text-indigo-400 bg-blue-50 rounded-lg border hover:border-blue-500">{el.h}</div>)} 
        </div>
        <div className="mt-2 text-gray-400"><FiChevronRight/></div>
      </div>
    {children}  
    </div>
  );
});
export default MiniTermSchedule;

