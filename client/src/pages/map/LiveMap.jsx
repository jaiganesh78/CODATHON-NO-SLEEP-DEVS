import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function LiveMap() {
  const issues = [
    {
      title: "Garbage Overflow",
      description: "Garbage not cleared",
      lat: 13.0827,
      lng: 80.2707,
      status: "Pending",
    },
    {
      title: "Street Light Issue",
      description: "Light not working",
      lat: 13.09,
      lng: 80.275,
      status: "In Progress",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        🗺️ Live Civic Issue Map
      </h1>

      <div className="bg-white rounded-2xl shadow p-4">
        <MapContainer
          center={[13.0827, 80.2707]}
          zoom={13}
          className="h-[75vh] w-full rounded-xl"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap"
          />

          {issues.map((issue, i) => (
            <Marker key={i} position={[issue.lat, issue.lng]}>
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
      </div>
    </div>
  );
}
