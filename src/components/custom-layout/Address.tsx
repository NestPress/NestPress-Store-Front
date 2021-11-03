
import { FiMapPin } from "react-icons/fi";
interface Props {
  className?: string;
  data?:any;
}

export const Address: React.FC<Props> = ({ className, data }) => {
  return (
    <div className="flex pb-2.5 gap-x-1">
      <div className="text-xs mt-1"><FiMapPin /></div>
      <div>
        <p className="text-sm pb-1">{data.street}, {data.city}</p>
        <p className="text-xs">{data.label}</p>
      </div>
    </div>
  );
};