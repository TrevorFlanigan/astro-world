import { NASAImage } from "../types";
import styles from "../styles/imageCard.module.css";
type ImageCardProps = {
  imageData: NASAImage;
  liked?: boolean;
};

const ImageCard = ({ imageData, liked = false }: ImageCardProps) => {
  return (
    <div className={styles["image-container"]} tabIndex={1}>
      <img
        className={styles["nasa-image"]}
        src={imageData.hdurl}
        alt={imageData.title}
      />
      <div className={styles.info}>
        <h1 className={styles["image-title"]}>{imageData.title}</h1>
        <p className={[styles.hidden].join(" ")}>{imageData.date}</p>
        <p className={[styles.hidden, styles.description].join(" ")}>
          {imageData.explanation}
        </p>
      </div>
    </div>
  );
};

export default ImageCard;
