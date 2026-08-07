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

export interface AppState {
    cities: City[];
    isLoading: boolean;
    currentCity: City | null;
    error: string;
}

// 3. Define the Action type as a Union of all possible actions
export type AppAction =
    | { type: "loading" }
    | { type: "cities/loaded"; payload: City[] }
    | { type: "city/loaded"; payload: City }
    | { type: "city/created"; payload: City }
    | { type: "city/deleted"; payload: string } // payload is the city.id (string)
    | { type: "rejected"; payload: string };

export interface User {
    name: string;
    email: string;
    password?: string;
    avatar?: string;
}
export interface AuthState {
    user: User | null;
    isAuthenticate: boolean;
}

export type AuthAction =
    | { type: "login"; payload: User }
    | { type: "logout" };
