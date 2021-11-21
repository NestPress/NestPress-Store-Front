interface Props {
  className?: string;
  asset?: string;
  gradient?: boolean;
  background?: string;
}
export const Background: React.FC<Props> = ({
  children,
  className,
  asset,
  gradient,
  background,
}) => {
  const bg: string = gradient
    ? background || "main-background-gradient"
    : background || "main-background";
  return (
    <div
      style={asset ? { backgroundImage: `url(${asset})` } : {}}
      className={`bg-no-repeat bg-cover bg-center relative ${className}`}
    >
      <div className={`absolute ${bg} inset-0 z-0`}></div>
      <div className="z-1 relative">{children}</div>
    </div>
  );
};
