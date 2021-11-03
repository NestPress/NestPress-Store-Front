import { FiStar } from "react-icons/fi";
interface Props {
  className?: string;
  stars?: number;
}
export const Stars: React.FC<Props> = ({ className, stars }) => {
  const fill = (i:number) => i < (stars || 0) ? '#10b981' : '#eee'
  return (
    <div className={`flex mb-5 gap-x-0.5 ${className}`}>
      {[...Array(5)].map((x, i) =>
        <FiStar key={i} fill={fill(i)} className="text-green-700" />
      )}
      <p className="text-xs text-gray-400 ml-1">20 opinions</p>
    </div>
  );
};