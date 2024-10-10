export type Location = {
  country: string;
  city: string;
};

export type Prevision = {
  dt: number;
  humidity: number;
  weather: { main: string }[];
  temp: { min: number; max: number };
};

export type Forecast = {
  today: {
    temp: number;
    humidity: number;
    weather: [{ main: string }];
    feels_like: number;
  };
  todayPrevision: { temp: { min: number; max: number } };
};

export type Coords = { lat: number; lon: number };

