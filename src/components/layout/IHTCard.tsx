import { apperiance } from 'blogData/config'
interface Props {
  className?: string;
  color?: string;
  Icon?: React.FC;
  iconColor?:string;
  title?:string;
  content?:string;
}
export const IHTCard: React.FC<Props> = ({  className, color, Icon, iconColor, title, content }) => {
  const compIconColor:string = apperiance[iconColor || 'maincolor'];
  return (
    <div className={`text-left ${className}`}>
      <div className="flex items-center gap-x-2">
        {Icon && <div  className={`text-${compIconColor.color}-${compIconColor.tone} `}><Icon /></div>}
        <div className="text-md">{title}</div>
      </div>
      <div className="flex-1 text-sm py-4 text-gray-500" >{content}</div>
    </div>
  );
};