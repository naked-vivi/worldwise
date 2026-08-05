import { createContext } from "react";
import type { City } from "../Type";

export type CitiesContextValue = {
    cities: City[];
    isLoading: boolean;
    currentCity: City | null;
    getCity: (id: string) => Promise<void>;
};

export const CitiesContext = createContext<CitiesContextValue | undefined>(undefined);
