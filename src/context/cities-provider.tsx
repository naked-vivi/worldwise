import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { City } from "../Type";
import { CitiesContext } from "./cities-context";

const BASE_URL = "http://localhost:3001";

function CitiesProvider({ children }: { children: ReactNode }) {
    const [cities, setCities] = useState<City[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState<City | null>(null);

    useEffect(() => {
        async function fetchCities() {
            try {
                setLoading(true);
                const res = await fetch(`${BASE_URL}/cities`);
                if (!res.ok) throw new Error("Failed to fetch cities");
                const data = await res.json();
                setCities(data);
            }
            catch {
                alert("Error fetching cities data");
            }
            finally {
                setLoading(false);
            }
        }
        fetchCities();
    }, []);

    const getCity = useCallback(async function getCity(id: string) {
        try {
            setLoading(true);
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            if (!res.ok) throw new Error("Failed to fetch city");
            const data = await res.json();
            setCurrentCity(data);
        }
        catch {
            alert("Error fetching cities data");
        }
        finally {
            setLoading(false);
        }
    }, []);

    return (
        <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
            {children}
        </CitiesContext.Provider>
    );
}

export { CitiesProvider };
