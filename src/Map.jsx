import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

function Map() {
  const [markers, setMarkers] = useState([]);
  const handlephoto = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView?.postMessage("openCamera");
    } else {
      console.log("Sei sul web non puoi!");
    }
  };
  const customIcon = L.divIcon({
    html: `
    <div class="customMarker">
        <img
          src="https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png"
          alt=""
        />

        <div class="logo2"></div>
        <div class="iconOverlay">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="logo"
            viewBox="0 0 32 32"
          >
            <g fill="currentColor" clip-path="url(#logo_svg__a)">
              <path d="M0 18.383c0-1.505 1.194-2.724 2.667-2.724H18v2.043c0 1.504-1.194 2.723-2.667 2.723H0zM9.333 32c-1.472 0-2.666-1.22-2.666-2.723v-8.17h2c1.472 0 2.666 1.219 2.666 2.723V32zM0 0h18.667C26.03 0 32 6.097 32 13.617H0zM16 32c2.101 0 4.182-.423 6.123-1.244a16 16 0 0 0 5.19-3.542 16.4 16.4 0 0 0 3.47-5.302A16.6 16.6 0 0 0 32 15.66h-9.159c0 .918-.177 1.826-.52 2.674a7 7 0 0 1-1.484 2.267 6.8 6.8 0 0 1-2.219 1.514c-.83.351-1.72.532-2.618.532z"></path>
            </g>
            <defs>
              <clipPath id="logo_svg__a">
                <path fill="" d="M0 0h32v32H0z"></path>
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      `,
    className: "",
    iconSize: [55, 90],
    iconAnchor: [19, 65],
    popupAnchor: [3.5, -64],
  });
  useEffect(() => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage("React loaded");
    }
  }, []);

  function HandleMarkers() {
    useMapEvents({
      click(e) {
        setMarkers((prev) => [...prev, e.latlng]);
      },
    });
    return null;
  }

  return (
    <div className="container">
      <div className="frame">
        <MapContainer
          center={[45.46, 9.19]}
          zoom={7}
          style={{ height: "500px", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <HandleMarkers />
          {markers.map((e, index) => (
            <Marker
              key={index}
              position={e}
              icon={customIcon}
              eventHandlers={{
                mouseover: (event) => event.target.openPopup(),
                mouseout: (event) => event.target.closePopup(),
              }}
            >
              <Popup>
                Cardio Center <br /> via Roma, 44 - 84100 Salerno (SA)
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <button
        style={{
          backgroundColor: "lightblue",
          color: "black",
          fontWeight: "bold",
          padding: "10px",
          margin: "0 0 0 20px",
          cursor: "pointer",
        }}
        onClick={handlephoto}
      >
        Scatta foto
      </button>
    </div>
  );
}

export default Map;
