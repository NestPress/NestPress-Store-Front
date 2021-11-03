import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
interface Props {
  className?: string;
}
export const SmallCalendar: React.FC<Props> = ({ className }) => {
  return (
    <div className="flex">
      <div>
        <div className="p-2 bg-blue-100 rounded-2xl h-min cursor-pointer">
          <FiChevronLeft className=" "/>
        </div>
      </div>
      <div className="grid grid-cols-4 items-center justify-between text-xs text-center flex-1 gap-2">
        <div className="pb-1">
          <div className="text-sm">Dziś</div>
          <div className="text-gray-400">10 Paź</div>
        </div>
        <div className="pb-1">
          <div className="text-sm">Jutro</div>
          <div className="text-gray-400">10 Paź</div>
        </div>
        <div className="pb-1">
          <div className="text-sm">Wt</div>
          <div className="text-gray-400">10 Paź</div>
        </div>
        <div className="pb-1">
          <div className="text-sm">Śr</div>
          <div className="text-gray-400">10 Paź</div>
        </div>

       
        <div className="text-gray-400">-</div>
        <div className="text-blue-600 border py-1 rounded bg-blue-100">10:45</div>
        <div className="text-blue-600 border py-1 rounded bg-blue-100">14:00</div>
        <div className="text-gray-400">-</div>

        <div className="text-gray-400">-</div>
        <div className="text-gray-400">-</div>
        <div className="text-gray-400">-</div>
        <div className="text-gray-400">-</div>

        <div className="text-blue-600 border py-1 rounded bg-blue-100">10:45</div>
        <div className="text-blue-600 border py-1 rounded bg-blue-100">14:00</div>

       
      </div>
     <div>
        <div className="p-2 bg-blue-100 rounded-2xl h-min cursor-pointer">
          <FiChevronRight className=" "/>
        </div>
      </div>

      
    </div>
  );
};