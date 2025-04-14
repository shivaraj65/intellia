import React from "react";
import styles from "./safeScreen.module.scss";
import Image from "next/image";
import { svgConf } from "@/assets/svgConf";

interface props {
  message: string;
  title: string;
}

const SafeScreen = ({ title = "", message = "" }: props) => {
  return (
    <div className={`${styles.safeScreen} primaryText`}>
      <div className={styles.errorRow}>
        <div className={styles.errorCol1}>
          <div className={styles.imageContainer}>
            <Image
              src={svgConf.general.global[0].src}
              alt={svgConf.general.global[0].name}
              className={styles.image}
            />
          </div>
        </div>
        <div className={styles.errorCol2}>
          <div className={styles.displayContent}>
            <h2 className={styles.displayContentInfo + " font1"}>{title}</h2>
            <div className={`${styles.errorCard} font2`}>
              <p className={styles.displayContentText}>{message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SafeScreen);
