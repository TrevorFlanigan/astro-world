import React, { useCallback, useEffect } from "react";
import styles from "./styles/index.module.css";
import Header from "./components/Header";
import ImageCard from "./components/ImageCard";
import { NASAImage } from "./types";
import getNextWeek from "./utils";

let newWeek = getNextWeek();

function App() {
  const [fetching, setFetching] = React.useState(false);
  const [imageData, setImageData] = React.useState<NASAImage[]>([]);
  const handleLoadImages = useCallback(async () => {
    if (fetching) {
      return;
    }
    setFetching(true);
    let res = await newWeek();
    setFetching(false);
    setImageData((old) => [...old, ...res]);
    console.log(res);
  }, [fetching]);

  useEffect(() => {
    handleLoadImages();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 20
      ) {
        handleLoadImages();
      }
    });
  }, [handleLoadImages]);
  return (
    <div className={styles.App}>
      <div className={styles["App-body"]}>
        {imageData.map((image, index) => (
          <ImageCard key={index} imageData={image} />
        ))}
      </div>
    </div>
  );
}

export default App;
