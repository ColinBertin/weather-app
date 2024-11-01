import { Forecast, Location } from "@/types";
import {
  TiWeatherCloudy,
  TiWeatherDownpour,
  TiWeatherShower,
  TiWeatherSnow,
  TiWeatherStormy,
  TiWeatherSunny,
  TiWeatherWindy,
} from "react-icons/ti";

type TodayCardProps = {
  location: Location;
  forecast: Forecast;
};

export default function TodayCard({ location, forecast }: TodayCardProps) {
  const { today, todayPrevision } = forecast;

  const handleIcon = (condition: string) => {
    switch (condition) {
      case "Thunderstorm":
        return <TiWeatherStormy />;
      case "Drizzle":
        return <TiWeatherShower />;
      case "Rain":
        return <TiWeatherDownpour />;
      case "Snow":
        return <TiWeatherSnow />;
      case "Clear":
        return <TiWeatherSunny />;
      case "Clouds":
        return <TiWeatherCloudy />;
      default:
        return <TiWeatherWindy />;
    }
  };

  return (
    <div className="flex flex-col justify-around mt-5 md:m-5 sm:px-6 py-8 border border-gray-300 rounded-lg bg-white">
      <div className="pb-6 gap-6">
        <div className="flex justify-center">
          <h1 className={`text-8xl sm:text-9xl font-semibold flex ${today.temp > 10 ? "text-orange" : "text-pursian-blue"}`}>{Math.round(today.temp)}<small className="text-6xl">°C</small></h1>
          <p className="text-7xl self-end">
            {handleIcon(today.weather[0].main)}
          </p>
        </div>
        <small className="flex mt-4 block ml-6 md:ml-0 text-sm ">
          Feels like {Math.round(today.feels_like)}<span className="text-xs">°C</span>
        </small>
      </div>
      <div className="text-xl ml-6 md:ml-0">
        <p className="flex">Min: {Math.round(todayPrevision.temp.min)}<small className="text-sm">°C</small></p>
        <p className="flex">Max: {Math.round(todayPrevision.temp.max)}<small className="text-sm">°C</small></p>
        <p className="">Humidity: {Math.round(today.humidity)}<small>%</small></p>
        <h2 className={`text-blue-500 text-4xl font-semibold ${today.temp > 10 ? "text-pursian-blue" : "text-orange"}`}>{`${location.city}, ${location.country}`}</h2>
      </div>
    </div>
  );
}
