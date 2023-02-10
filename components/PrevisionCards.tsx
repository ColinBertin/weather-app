import {
  TiWeatherCloudy,
  TiWeatherDownpour,
  TiWeatherNight,
  TiWeatherPartlySunny,
  TiWeatherShower,
  TiWeatherSnow,
  TiWeatherStormy,
  TiWeatherSunny,
  TiWeatherWindyCloudy,
  TiWeatherWindy,
} from "react-icons/ti";

type PrevisionCardsProps = any;

export default function PrevisionCards({ data }: PrevisionCardsProps) {
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
    <div>
      <div className="flex flex-col justify-around items-center mt-4 w-24 h-36 border border-gray-300 rounded-lg">
        <div className="text-5xl">{handleIcon(data.weather[0].main)}</div>
        <div>
          {/* <p>{unix}</p> */}
          <p>Min: {Math.round(data.temp.min)}°</p>
          <p>Max: {Math.round(data.temp.max)}°</p>
        </div>
      </div>
    </div>
  );
}
