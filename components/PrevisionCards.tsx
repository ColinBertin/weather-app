import { Prevision } from "@/types";
import { useState, useMemo } from "react";
import {
  TiWeatherStormy,
  TiWeatherShower,
  TiWeatherDownpour,
  TiWeatherSnow,
  TiWeatherSunny,
  TiWeatherCloudy,
  TiWeatherWindy,
  // TiWeatherPartlySunny,
  // TiWeatherNight,
} from "react-icons/ti";
import { WiHumidity } from "react-icons/wi";

type PrevisionCardsProps = {
  data: Prevision;
};

export default function PrevisionCards({ data }: PrevisionCardsProps) {
  const [date, setDate] = useState(0);
  const [month, setMonth] = useState(0);

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

  useMemo(() => {
    const formattedDate = new Date(data.dt * 1000);
    setDate(formattedDate.getDate());
    setMonth(formattedDate.getMonth() + 1);
  }, [data.dt]);

  return (
    <div className="flex flex-col justify-around items-center mt-4 w-24 h-36 border border-gray-300 rounded-lg bg-white">
      <div className="text-5xl">{handleIcon(data.weather[0].description)}</div>
      <div className="">
        <p className="mb-2">
          {date}/{month}
        </p>
        <p className="flex justify-between">
          {data.humidity} <WiHumidity className="text-2xl text-blue-300" />
        </p>
      </div>
    </div>
  );
}
