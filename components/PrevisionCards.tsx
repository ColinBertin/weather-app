import { useState, useMemo } from "react";
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
import { WiHumidity } from "react-icons/wi";

type PrevisionCardsProps = any;

export default function PrevisionCards({ data }: PrevisionCardsProps) {
  const [date, setDate] = useState(0);
  const [month, setMonth] = useState(0);
  const [sunrise, setSunrise] = useState(0);
  const [sunset, setSunset] = useState(0);

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

  console.log(data);

  useMemo(() => {
    const formattedDate = new Date(data.dt * 1000);
    setDate(formattedDate.getDate());
    setMonth(formattedDate.getMonth() + 1);
  }, [setDate, setMonth]);

  return (
    <div>
      <div className="flex flex-col justify-around items-center mt-4 w-24 h-36 border border-gray-300 rounded-lg">
        <div className="text-5xl">{handleIcon(data.weather[0].main)}</div>
        <div className="">
          <p className="mb-2">
            {date}/{month}
          </p>
          <p className="flex justify-between">
            {data.humidity} <WiHumidity className="text-2xl" />
          </p>
        </div>
      </div>
    </div>
  );
}
