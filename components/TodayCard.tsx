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
  };
};

export default function TodayCard({ city, country, today }: TodayCardProps) {
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
    <div className="mt-5 py-8 border border-gray-300 rounded-lg">
      <div className="flex justify-center pb-6 gap-6">
        <h1 className="text-8xl">{Math.round(today.temp)}°</h1>
        <p className="text-6xl self-center">
          {handleIcon(today.weather[0].main)}
        </p>
      </div>
      <div className="flex justify-around text-xl">
        <p className="">{Math.round(today.humidity)}%</p>
      </div>
      <h2 className="text-red-500 text-center mt-4">{`${city}, ${country}`}</h2>
    </div>
  );
}
