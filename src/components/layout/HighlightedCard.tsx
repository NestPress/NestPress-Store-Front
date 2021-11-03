import { apperiance } from 'blogData/config'
interface Props {
  className?: string;
  color?: string;
}
export const HighlightedCard: React.FC<Props> = ({ children, className, color }) => {
  const compColor:string = apperiance[color || 'darkbg'];
  return (
    <div className={`
      p-5 
      bg-${compColor.color}-${compColor.tone} 
      bg-opacity-10 rounded ${className}`}>
      {children}
    </div>
  );
};