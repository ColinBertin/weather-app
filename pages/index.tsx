import LineChart from "@/components/Charts";
import LoadingSpinner from "@/components/LoadingSpinner";
import PrevisionCards from "@/components/PrevisionCards";
import SearchBar from "@/components/SearchBar";
import TodayCard from "@/components/TodayCard";
import Head from "next/head";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";

type WeatherData = {
  lat: number;
  lon: number;
};

type Today = {
  temp: number;
  humidity: number;
  feels_like: number;
  weather: [{ main: string }];
};

export default function Home() {
  const [request, setRequest] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [today, setToday] = useState<Today>();
  const [todayPrevision, setTodayPrevision] = useState([]);
  const [previsions, setPrevisions] = useState([]);
  const [hourlyPrevisions, setHourlyPrevisions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getWeatherData = async (lonLat: WeatherData[]) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lonLat[0].lat}&lon=${lonLat[0].lon}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setToday(data.current);
      setTodayPrevision(data.daily[0]);
      setPrevisions(data.daily.splice(1, 7));
      setHourlyPrevisions(data.hourly);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getCoords = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${request}&limit=10&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      getWeatherData(data);
      setCity(data[0].name);
      setCountry(data[0].country);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRequest(e.target.value);
  };

  useEffect(() => {
    // console.log(hourlyPrevisions);
    // console.log(today);
    // console.log(todayPrevision);
  }, [city, country, today, hourlyPrevisions]);

  return (
    <>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col h-screen p-6">
        <div className="m-auto">
          <h1 className="text-center text-4xl mb-8">My Weather Forecast</h1>
          <SearchBar
            handleChange={handleChange}
            getCoords={getCoords}
            isLoading={isLoading}
          />
          {city && country && today && previsions && (
            <>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <TodayCard
                    today={today}
                    previsionToday={todayPrevision}
                    city={city}
                    country={country}
                  />
                  <LineChart previsions={previsions} />
                  <div className="flex flex-wrap gap-5 justify-center mb-8">
                    {previsions.map((prevision, i) => {
                      return <PrevisionCards key={i} data={prevision} />;
                    })}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
