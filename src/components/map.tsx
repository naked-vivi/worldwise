import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import type { LatLngTuple } from "leaflet";
import styles from "./map.module.css"
import { useCities } from "../context/use-cities";

function ChangeCenter({ position }: { position: LatLngTuple }) {
    const map = useMap();

    useEffect(() => {
        map.setView(position);
    }, [map, position]);

    return null;
}

function Map() {
    // const navigate = useNavigate();
    const { cities } = useCities();

    const [searchParams] = useSearchParams();
    const mapLat = searchParams.get("lat");
    const mapLng = searchParams.get("lng");

    // const mapPosition = useMemo<LatLngTuple>(() => {
    //     if (!mapLat || !mapLng) return [40, 0];
    //     return [Number(mapLat), Number(mapLng)];
    // }, [mapLat, mapLng]);

    return (
        //org to fr/hot mapStyle in title layer url
        <div className={styles.mapContainer} >
            <MapContainer
                center={[mapLat, mapLng]}
                zoom={13}
                scrollWheelZoom={true}
                className={styles.map}>
                <ChangeCenter position={mapPosition} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) =>
                    <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                        <Popup>
                            <span>{city.emoji}</span> <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    )
}

export default Map
