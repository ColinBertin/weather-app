import SearchBar from "@/components/SearchBar";
import TodayCard from "@/components/TodayCard";
import Head from "next/head";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";

// Has to be change---------------------------------------------------------------------
type WeatherData = {
  lat: number;
  lon: number;
};

type Today = {
  temp: number;
  humidity: number;
  weather: [{ main: string }];
};

export default function Home() {
  const [request, setRequest] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [today, setToday] = useState<Today>();
  const [previsions, setPrevisions] = useState([]);
  // const [todayDate, setTodayDate] = useState("");
  // const [currentTime, setCurrentTime] = useState(6);

  const getWeatherData = async (lonLat: WeatherData[]) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lonLat[0].lat}&lon=${lonLat[0].lon}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();
      setToday(data.current);
      setPrevisions(data.daily.splice(1, 7));
    } catch (error) {
      console.log(error);
    }
  };

  const getCoords = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${request}&limit=10&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      getWeatherData(data);
      setCity(data[0].name);
      setCountry(data[0].country);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRequest(e.target.value);
  };

  useEffect(() => {
    console.log(city, country);
    console.log(today);
    console.log(previsions);
  }, [city, country, today, previsions]);

  return (
    <>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col h-screen">
        <div className="m-auto">
          <SearchBar handleChange={handleChange} getCoords={getCoords} />
          {city && country && today && previsions && (
            <TodayCard today={today} city={city} country={country} />
          )}
        </div>
      </main>
    </>
  );
}
