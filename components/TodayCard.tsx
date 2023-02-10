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

type TodayCardProps = {
  city: string;
  country: string;
  today: {
    temp: number;
    humidity: number;
    weather: [{ main: string }];
    feels_like: number;
  };
  previsionToday: any;
};

export default function TodayCard({
  city,
  country,
  today,
  previsionToday,
}: TodayCardProps) {
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
    <div className="flex justify-around flex-wrap mt-5 py-8 border border-gray-300 rounded-lg">
      <div className="pb-6 gap-6">
        <div className="flex justify-center">
          <h1 className="text-8xl">{Math.round(today.temp)}°</h1>
          <p className="text-7xl self-center">
            {handleIcon(today.weather[0].main)}
          </p>
        </div>
        <p className="mt-4 text-sm">
          Feels like {Math.round(today.feels_like)}°
        </p>
      </div>
      <div className="text-xl">
        <p className="">Min: {Math.round(previsionToday.temp.min)}°</p>
        <p className="">Max: {Math.round(previsionToday.temp.max)}°</p>
        <p className="">Humidity: {Math.round(today.humidity)}%</p>
        <h2 className="text-red-500">{`${city}, ${country}`}</h2>
      </div>
    </div>
  );
}
