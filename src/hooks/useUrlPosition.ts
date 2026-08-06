import { useSearchParams } from "react-router-dom";


export function useUrlPosition() {
    const [searchParams] = useSearchParams();
    const lat: number = Number(searchParams.get("lat")) //lat-lngTuple expect number
    const lng: number = Number(searchParams.get("lng"))

    return [lat, lng]
}

