import React from "react";
import styles from "./noReviewsCreated.module.scss";
import Image from "next/image";
import { Button } from "antd";
import { svgConf } from "@/assets/svgConf";

interface props {
  message: string;
  title: string;
  buttonText: string;
  buttonAction?: () => void;
}

const NoReviewsCreated = ({
  title = "",
  message = "",
  buttonText = "",
  buttonAction,
}: props) => {
  return (
    <div className={`${styles.noPollsCreated} primaryText`}>
      <div className={styles.errorRow}>
        <div className={styles.errorCol1}>
          <div className={styles.imageContainer}>
            <Image
              src={svgConf.general.empty[4].src}
              alt={svgConf.general.empty[4].name}
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
            {buttonText !== "" && (
              <div className={styles.btnContainer}>
                <Button
                  className={styles.actionBtn + " font2"}
                  type={"primary"}
                  size="large"
                  block
                  shape="round"
                  onClick={buttonAction}
                >
                  {buttonText}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(NoReviewsCreated);
