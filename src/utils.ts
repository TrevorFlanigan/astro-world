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
  let fetching: Promise<any> | null = null;
  return async () => {
    // Force images to be fetched in chronological order
    if (fetching) await fetching;
    let imagesPromise = fetchNasaData(currentDate);
    fetching = imagesPromise;
    currentDate.setDate(currentDate.getDate() - 7);
    let response = await imagesPromise;

    if (response.ok) {
      let json = (await response.json()) as NASAImage[];
      let toIndex = json.filter((image: any) => image.media_type === "image");
      let withKeys = toIndex.map((image: any) => {
        return {
          ...image,
          key: image.title,
        };
      });

      return withKeys.reverse();
    }
    throw new Error("Failed to fetch data");
  };
};

export default getNextWeek;
