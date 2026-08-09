import { useCallback, useEffect, useReducer } from "react";
import type { ReactNode } from "react";
import type { AppState, AppAction, NewCity } from "../Type";
import { CitiesContext } from "./cities-context";

const BASE_URL = "http://localhost:3001";

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: null,
    error: ""
}

function reducer(state: AppState, action: AppAction) {
    switch (action.type) {
        case "loading":
            return {
                ...state, isLoading: true
            }
        case "cities/loaded":
            return {
                ...state, isLoading: false, cities: action.payload
            }
        case "city/loaded":
            return {
                ...state, isLoading: false, currentCity: action.payload
            }
        case "city/created":
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload,
            }
        case "city/deleted":
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter((city) => city.id !== action.payload),
                currentCity: null
            }
        case "rejected":
            return {
                ...state, isLoading: false, error: action.payload
            }
        default:
            throw new Error("Unknown error type")
    }

}

function CitiesProvider({ children }: { children: ReactNode }) {
    // const [cities, setCities] = useState<City[]>([]);
    // const [isLoading, setLoading] = useState(false);
    // const [currentCity, setCurrentCity] = useState<City | null>(null);
    const [{ cities, isLoading, currentCity }, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        async function fetchCities() {
            try {
                dispatch({ type: "loading" })
                const res = await fetch(`${BASE_URL}/cities`);
                if (!res.ok) throw new Error("Failed to fetch cities");
                const data = await res.json();
                dispatch({ type: "cities/loaded", payload: data })
            }
            catch {
                dispatch({ type: "rejected", payload: "Error fetching cities data" })
            }
        }
        fetchCities();
    }, []);


    const getCity = useCallback(async function getCity(id: string) {
        if (id === currentCity?.id) return;
        try {
            dispatch({ type: "loading" })
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            if (!res.ok) throw new Error("Failed to fetch city");
            const data = await res.json();
            dispatch({ type: "city/loaded", payload: data })
        }
        catch {
            dispatch({ type: "rejected", payload: "Error getting cities data" });
        }
    }, [currentCity?.id])

    async function createCity(newCity: NewCity) {
        try {
            dispatch({ type: "loading" })
            const res = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!res.ok) throw new Error("Failed to fetch city");
            const data = await res.json();
            dispatch({ type: "city/created", payload: data })
        }
        catch {
            dispatch({ type: "rejected", payload: "Error creating cities data" })
        }
    };

    async function deleteCity(id: string) {
        try {
            dispatch({ type: "loading" })
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE",
            });
            dispatch({ type: "city/deleted", payload: id })
        }
        catch {
            dispatch({ type: "rejected", payload: "Error deleting cities data" })
        }

    };


    return (
        <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity, createCity, deleteCity }}>
            {children}
        </CitiesContext.Provider>
    );
}

export { CitiesProvider };
