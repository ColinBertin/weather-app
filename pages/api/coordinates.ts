// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Coords = { lat: number; lon: number; country: string; city: string };
type Error = { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Coords | Error>
) {
  try {
    const { name } = req.query;
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=10&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    const coords = {
      lat: data[0].lat,
      lon: data[0].lon,
      country: data[0].country,
      city: data[0].name,
    };
    res.status(200).json(coords);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(400).json({ message: "An Error Occur" });
  }
}
