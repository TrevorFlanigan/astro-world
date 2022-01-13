import { NASAImage } from "./types";

const fetchNasaData = async (date: Date) => {
  const weekBeforeDate = new Date(date);
  weekBeforeDate.setDate(weekBeforeDate.getDate() - 6);
  const formattedWeekBefore = weekBeforeDate.toISOString().split("T")[0];
  const formattedDate = date.toISOString().split("T")[0];

  console.log(formattedWeekBefore, formattedDate);

  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}&start_date=${formattedWeekBefore}&end_date=${formattedDate}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
  throw new Error("Failed to fetch data");
};

const getNextWeek = () => {
  let currentDate = new Date();
  return async () => {
    let imagesPromise = fetchNasaData(currentDate);
    currentDate.setDate(currentDate.getDate() - 7);
    let response = await imagesPromise;

    if (response.ok) {
      let json = (await response.json()) as NASAImage[];
      return json.filter((image: any) => image.media_type === "image");
    }
    throw new Error("Failed to fetch data");
  };
};

export default getNextWeek;
