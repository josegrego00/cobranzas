import React from "react";
import styles from "./Text.module.scss";

const Text = ({ 
  normalText, 
  highlightedText, 
  normalColor = "#333", 
  highlightColor = "green", 
  bold = true 
}) => {
  return (
    <p 
      className={styles["text"]} 
      style={{ color: normalColor }}
    >
      {normalText}{" "}
      <span 
        className={`${styles["text__highlight"]} ${bold ? styles["text__highlight--bold"] : ""}`} 
        style={{ color: highlightColor }}
      >
        {highlightedText}
      </span>
    </p>
  );
};

export default Text;
