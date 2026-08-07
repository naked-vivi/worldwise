export type City = {
    id: string;
    cityName: string;
    country: string;
    emoji: string;
    date: string;
    notes: string;
    position: {
        lat: number;
        lng: number;
    };
};

export type NewCity = Omit<City, "id">;

export interface State {
    cities: City[];
    isLoading: boolean;
    currentCity: City | null;
    error: string;
}

// 3. Define the Action type as a Union of all possible actions
export type Action =
    | { type: "loading" }
    | { type: "cities/loaded"; payload: City[] }
    | { type: "city/loaded"; payload: City }
    | { type: "city/created"; payload: City }
    | { type: "city/deleted"; payload: string } // payload is the city.id (string)
    | { type: "rejected"; payload: string };