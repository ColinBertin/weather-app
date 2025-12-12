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
    const d = condition.toLowerCase();
    
    switch (true) {
      case d.includes("thunderstorm"):
        return <TiWeatherStormy />;

      case d.includes("drizzle"):
        return <TiWeatherShower />;

      case d.includes("light rain") || d.includes("moderate rain"):
        return <TiWeatherShower />;

      case d.includes("heavy intensity rain") ||
        d.includes("very heavy rain") ||
        d.includes("extreme rain"):
        return <TiWeatherDownpour />;

      case d.includes("freezing rain"):
        return <TiWeatherDownpour />;

      case d.includes("snow") ||
        d.includes("sleet") ||
        d.includes("light shower sleet") ||
        d.includes("shower sleet") ||
        d.includes("light rain and snow") ||
        d.includes("rain and snow") ||
        d.includes("light shower snow") ||
        d.includes("shower snow") ||
        d.includes("heavy shower snow"):
        return <TiWeatherSnow />;

      // case d.includes("mist") ||
      //   d.includes("smoke") ||
      //   d.includes("haze") ||
      //   d.includes("fog") ||
      //   d.includes("sand") ||
      //   d.includes("dust") ||
      //   d.includes("volcanic ash") ||
      //   d.includes("squalls"):
      //   return <TiWeatherMist />;

      case d.includes("tornado"):
        return <TiWeatherWindy />;

      case d.includes("clear sky"):
        return <TiWeatherSunny />;

      case d.includes("few clouds") ||
        d.includes("scattered clouds") ||
        d.includes("broken clouds") ||
        d.includes("overcast clouds") ||
        d.includes("cloud"):
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
