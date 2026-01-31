import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function MapView({ issues }) {
  return (
    
    <MapContainer
      center={[13.0827, 80.2707]}
      zoom={13}
      className="h-[400px] w-full rounded-xl"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap"
      />

      {issues?.map((issue, index) => (
        <Marker key={index} position={[issue.lat, issue.lng]}>
          <Popup>
            <h3 className="font-semibold">{issue.title}</h3>
            <p>{issue.description}</p>
            <p className="text-sm text-gray-500">
              Status: {issue.status}
            </p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
