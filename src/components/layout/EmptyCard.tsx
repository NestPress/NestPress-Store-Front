interface Props {
  className?: string;
  columns?: number;
}
export const EmptyCard: React.FC<Props> = ({  className, columns, children }) => {
  return (
    <div className={`text-left rounded shadow-sm bg-white ${className}`}>
      {children}
    </div>
  );
};