import { NASAImage } from "../types";
import styles from "../styles/imageCard.module.css";
import animations from "../styles/animation.module.css";
import React, { useEffect } from "react";
import { positional } from "yargs";
type ImageCardProps = {
  imageData: NASAImage;
  handleLike: (key: string, liked: boolean) => void;
  index: number;
};

const ImageCard = ({ imageData, handleLike, index }: ImageCardProps) => {
  const [liked, setLiked] = React.useState(
    localStorage.getItem(imageData.key) === "true"
  );

  const innerLike = () => {
    handleLike(imageData.key, !liked);
    setLiked((old) => !old);
  };
  const [inspected, setInspected] = React.useState(false);

  const handleClose = () => {
    setInspected(false);
  };

  return (
    <div
      onMouseDown={(e) => e.preventDefault()}
      className={[
        styles["image-container"],
        inspected ? styles.inspected : "",
      ].join(" ")}
      onDoubleClick={innerLike}
    >
      <div className={styles["header-uninspected"]}>
        <p className={[styles.date].join(" ")}>
          {imageData.copyright || "Anonymous"}, {imageData.date}
        </p>
        <button
          tabIndex={1}
          className={[
            styles["heart-icon"],
            inspected ? styles["heart-hidden"] : "",
          ].join(" ")}
          onSubmit={innerLike}
        >
          <i
            style={{ position: "absolute", top: 1 }}
            className={["fas", "fa-heart", "fa-2x"].join(" ")}
          ></i>
          <i
            className={[
              "fas",
              "fa-heart",
              "fa-2x",
              liked && animations["slide-in-blurred-bl"],
              liked && styles.liked,
            ].join(" ")}
          ></i>
        </button>
      </div>
      <img
        className={styles["nasa-image"]}
        src={imageData.hdurl}
        alt={imageData.title}
      />
      <div className={styles.info}>
        <div className={styles.header}>
          <button
            tabIndex={1}
            className={styles["times-icon"]}
            onClick={handleClose}
          >
            <i className={["fas", "fa-times", "fa-2x"].join(" ")}></i>
          </button>
          <h1 className={styles["image-title"]}>{imageData.title}</h1>
          <button
            tabIndex={1}
            className={[
              styles["heart-icon"],
              !inspected ? styles["heart-hidden"] : "",
            ].join(" ")}
            onSubmit={innerLike}
          >
            <i
              style={{ position: "absolute", right: 5 }}
              className={["fas", "fa-heart", "fa-2x"].join(" ")}
            ></i>
            <i
              className={[
                "fas",
                "fa-heart",
                "fa-2x",
                liked && animations["slide-in-blurred-bl"],
                liked ? styles.liked : "",
              ].join(" ")}
            ></i>
          </button>
        </div>
        <button
          onClick={() => setInspected(true)}
          tabIndex={1}
          aria-hidden={!inspected}
          className={[
            inspected ? styles.hidden : "",
            styles.revealable,
            styles["description-button"],
          ].join(" ")}
        >
          See Description
        </button>
        <p
          className={[inspected ? "" : styles.hidden, styles.description].join(
            " "
          )}
        >
          {imageData.explanation}
        </p>
      </div>
    </div>
  );
};

export default ImageCard;
