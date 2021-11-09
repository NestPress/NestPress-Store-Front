interface Props {
  className?: string
  background?: string
  textcolor?: string
}
export const HighlightedCard: React.FC<Props> = ({ children, className, background, textcolor }) => {
  return (
    <div className={`
      p-5 
      ${textcolor || 'dark-text'} 
      ${background || 'light-background'} 
      rounded 
      ${className}`}>
      {children}
    </div>
  );
};