interface Props {
  className?: string;
  Icon?: React.FC;
  iconcolor?:string;
  textcolor?:string;
  title?:string;
  content?:string;
}
export const IHTCard: React.FC<Props> = ({  className, Icon, title, content, iconcolor, textcolor }) => {
  return (
    <div className={`text-left ${className}`}>
      <div className="flex items-center gap-x-2">
        {Icon && <div  className={`${iconcolor || 'dark-text'}`}><Icon /></div>}
        <div className="text-md">{title}</div>
      </div>
      <div className={`flex-1 text-sm py-4 dark-text`}>{content}</div>
    </div>
  );
};