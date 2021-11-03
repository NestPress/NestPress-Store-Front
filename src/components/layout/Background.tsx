import { apperiance } from 'blogData/config'
interface Props {
  className?: string;
  asset?: string;
  color?: string;
  gradient?:boolean
}
export const Background: React.FC<Props> = ({ children, className, asset, color, gradient }) => {
  const maskColor:string = apperiance[color || 'maincolor'];
  const bg = gradient ? `from-${maskColor.color}-${maskColor.tone} to-${maskColor.color}-${maskColor.tone-100}` : `bg-${maskColor.color}-${maskColor.tone}`
  return (
    <div  style={{ backgroundImage: `url(${asset})`}} className={`bg-no-repeat bg-cover bg-center relative ${className}`}>
      <div className={`
        absolute bg-gradient-to-b 
        ${bg}
        opacity-75 inset-0 z-0`}></div> 
      <div className="z-1 relative">{children}</div>
    </div>
  );
};