import React, { useCallback, useEffect } from "react";
import styles from "./styles/index.module.css";
import ImageCard from "./components/ImageCard";
import { NASAImage } from "./types";
import getNextWeek from "./utils";
import _ from "lodash";
let newWeek = getNextWeek();

function App() {
  const [fetching, setFetching] = React.useState(false);
  const [imageData, setImageData] = React.useState<NASAImage[]>([]);
  const handleLike = (key: string, liked: boolean) => {
    localStorage.setItem(key, liked + "");
  };
  const handleLoadImages = useCallback(async () => {
    if (fetching) {
      return;
    }
    setFetching(true);
    let res = await newWeek();
    setFetching(false);
    setImageData((old) => [...old, ...res]);
  }, [fetching]);

  const throttledLoadImages = _.throttle(handleLoadImages, 2000);

  useEffect(() => {
    throttledLoadImages();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - document.body.offsetHeight / 4
      ) {
        throttledLoadImages();
      }
    });
  }, [throttledLoadImages]);

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
