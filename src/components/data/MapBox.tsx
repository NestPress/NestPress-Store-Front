/* TODO fix type */
// @ts-ignore
// @ts-nocheck

import { memo } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
interface Props {
  attrs: any;
}
const MapBox: React.FC<Props> = memo(({ attrs, children }) => {
  const Map = ReactMapboxGl({
    // TODO do it more secure
    accessToken: attrs.token,
  });
  return (
    <div className={`${attrs.classes}`}>
      <Map
        style={`mapbox://styles/mapbox/streets-v9`}
        containerStyle={{
          height: "100%",
          width: "100%",
        }}
      >
        <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
          {/* // coordinates: startCoordinates, */}
          <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
        </Layer>
      </Map>
      {children}
    </div>
  );
});
export default MapBox;
