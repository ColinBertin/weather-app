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
    <div className="flex flex-col justify-around mt-5 md:m-5 p-8 border border-gray-300 rounded-lg bg-white">
      <div className="pb-6 gap-6">
        <div className="flex justify-center">
          <h1 className="text-9xl">{Math.round(today.temp)}°</h1>
          <p className="text-7xl self-center">
            {handleIcon(today.weather[0].main)}
          </p>
        </div>
        <p className="mt-4 ml-6 md:ml-0 text-sm ">
          Feels like {Math.round(today.feels_like)}°
        </p>
      </div>
      <div className="text-xl ml-6 md:ml-0">
        <p className="">Min: {Math.round(todayPrevision.temp.min)}°</p>
        <p className="">Max: {Math.round(todayPrevision.temp.max)}°</p>
        <p className="">Humidity: {Math.round(today.humidity)}%</p>
        <h2 className="text-blue-500 text-4xl font-bold">{`${location.city}, ${location.country}`}</h2>
      </div>
    </div>
  );
}
