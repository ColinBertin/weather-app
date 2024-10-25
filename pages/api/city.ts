// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Coords = { lat: number; lon: number; };
type Error = { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Coords | Error>
) {
  try {
    const { lon, lat } = req.query;

    const url =  `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=10&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data[0].name);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(400).json({ message: "An Error Occur" });
  }
}
