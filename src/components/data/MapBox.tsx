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
    <div className={`block ${attrs.classes}`}>
      {attrs.token ? <Map
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
      </Map>:<div>Insert MapBox valid token</div>}
      {children}
    </div>
  );
});
export default MapBox;
{/*<ReactMapGL
        className={tw`h-screen`}
        {...viewport}
        mapStyle={new Date().getHours() > 20 ? 'mapbox://styles/mapbox/dark-v10' : 'mapbox://styles/mapbox/light-v10'}
        mapboxApiAccessToken={MB_TOKEN}
        onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
      >
        {profileData?.getProfile?.location && !profileData?.getProfile?.hideMeOnMap && (
          <Marker
            latitude={profileData.getProfile.location.lat}
            longitude={profileData.getProfile.location.long}
          >
            {profileData.getProfile.featuredAsset?.preview ? <GetImage
              src={profileData.getProfile.featuredAsset?.preview}
              alt=""
              className={tw`rounded-full h-6 w-6`}
              onClick={() => navigate(`/me`)}
            /> : getProfileIcon(profileData?.getProfile?.profileType || '', profileData?.getProfile?.id)}
          </Marker>
        )}
        {dataFindProfiles?.findProfiles?.list.flatMap((e) =>
          e && e.location && !e.hideMeOnMap ? (
            <Marker
              key={e.id}
              latitude={e.location.lat}
              longitude={e.location.long}
            >
              {e.featuredAsset?.preview ? <GetImage
                src={e.featuredAsset?.preview}
                alt=""
                className={tw`rounded-full h-6 w-6`}
                onClick={() => navigate(`/user/${e.id}`)}
              /> : getProfileIcon(e?.profileType || '', e.id)}
            </Marker>
          ) : null
        )}
        {data?.getEvents.flatMap((e) =>
          e ? (
            <Marker
              key={e.id}
              latitude={e.location.lat}
              longitude={e.location.long}
            >
              <GetImage
                src={IconCalendarMain}
                alt=""
                className={tw`rounded-full h-6 w-6 bg-white`}
                onClick={() => navigate(`/event/${e.id}`)}
              />
            </Marker>
          ) : null
        )}
      </ReactMapGL>*/}