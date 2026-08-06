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