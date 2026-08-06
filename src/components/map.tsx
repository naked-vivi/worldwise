import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from "react-leaflet";
import type { LatLngTuple } from "leaflet";
import styles from "./map.module.css"
import { useCities } from "../context/use-cities";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition"
import Button from "./button";

export default function Map() {
    // const navigate = useNavigate();
    const { cities } = useCities();
    const [mapPosition, setMapPosition] = useState<LatLngTuple>([40, 0]);
    const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation();
    const [mapLat, mapLng] = useUrlPosition();

    useEffect(() => {
        if (mapLat && mapLng)
            setMapPosition([mapLat, mapLng]);
    }, [mapLat, mapLng])

    useEffect(() => {
        if (geolocationPosition)
            setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
    }, [geolocationPosition])

    return (
        //org to fr/hot mapStyle in title layer url
        <div className={styles.mapContainer} >
            {!geolocationPosition &&
                <Button type="position" onClick={getPosition}>
                    {isLoadingPosition ? "Loading..." : "Use your position"}
                </Button>
            }
            <MapContainer
                center={mapPosition}
                zoom={13}
                scrollWheelZoom={true}
                className={styles.map}>
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
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    )
}

function ChangeCenter({ position }: { position: LatLngTuple }) { //move between cities and show center
    const map = useMap();
    map.setView(position)
    return null;
}

function DetectClick() { //click on map and move
    const navigate = useNavigate();

    useMapEvent("click", (e) => {
        navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    });
    return null;
}


