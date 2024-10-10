// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Forecast } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

type Error = { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Forecast | Error>
) {
  try {
    const { lat, lon } = req.query;
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

    const forecast = {
      today: data.current,
      todayPrevision: data.daily[0],
      previsions: data.daily.splice(1, 7),
    };

    res.status(200).json(forecast);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(400).json({ message: "An Error Occur" });
  }
}
