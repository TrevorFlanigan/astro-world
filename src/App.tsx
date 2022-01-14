import React, { useCallback, useEffect } from "react";
import styles from "./styles/index.module.css";
import ImageCard from "./components/ImageCard";
import { NASAImage } from "./types";
import getNextWeek from "./utils";
import _ from "lodash";
let newWeek = getNextWeek();

function App() {
  const [imageData, setImageData] = React.useState<NASAImage[]>([]);
  const handleLike = (key: string, liked: boolean) => {
    localStorage.setItem(key, liked + "");
  };
  const handleLoadImages = useCallback(async () => {
    let res = await newWeek();
    setImageData((old) => [...old, ...res]);
  }, []);

  const throttledLoadImages = useCallback(
    () => _.throttle(handleLoadImages, 2000),
    [handleLoadImages]
  )();

  useEffect(() => {
    throttledLoadImages();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (window.scrollY * 2 >= document.body.offsetHeight) {
        throttledLoadImages();
      }
    });
  }, []);

  return (
    <div className={styles.App}>
      <div className={styles["App-body"]}>
        {imageData.map((image, index) => (
          <ImageCard
            handleLike={handleLike}
            key={index}
            index={3 * index + 1}
            imageData={image}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
