import { memo } from "react";
interface Props {
  attrs: any;
}
const MapBox: React.FC<Props> = memo(({ attrs, children }) => {
  
  return (
    <div className={`${attrs.classes}`}>
    MAPBOX
      {children}
    </div>
  );
});
export default MapBox;