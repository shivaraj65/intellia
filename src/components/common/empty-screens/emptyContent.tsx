/**
 * component for the empty content
 * when DApp is available and no content exists
 */

import React from "react";
import styles from "./emptyContent.module.scss";
import Image from "next/image";
import { Button } from "antd";
import { svgConf } from "@/assets/svgConf";

interface props {
  message: string;
  title: string;
  buttonText: string;
  buttonAction: () => void;
}

const NoContent = ({
  title = "",
  message = "",
  buttonText = "",
  buttonAction,
}: props) => {
  return (
    <div className={`${styles.emptyscreen} primaryText`}>
      <div className={styles.errorRow}>
        <div className={styles.errorCol1}>
          <div className={styles.imageContainer}>
            <Image
              src={svgConf.general?.empty?.[0]?.src}
              alt={svgConf.general?.empty?.[0]?.name}
              className={styles.image}
            />
          </div>
        </div>
        <div className={styles.errorCol2}>
          <div className={styles.displayContent}>
            <h2 className={styles.displayContentInfo + " title"}>{title}</h2>
            <div className={`${styles.errorCard} font1`}>
              <p className={styles.displayContentText}>{message}</p>
            </div>
            <div className={styles.btnContainer}>
              <Button
                className={styles.actionBtn + " font2"}
                type={"default"}
                size="large"
                block
                shape="round"
                onClick={buttonAction}
              >
                {buttonText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(NoContent);
