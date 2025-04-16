/**
 * component for the empty DApp
 * should use when the Dapp is not configured / available
 */

import React from "react";
import styles from "./emptyScreen.module.scss";
import Image from "next/image";
import { Button } from "antd";
import { svgConf } from "@/assets/svgConf";

interface props {
  message: string;
  title: string;
  buttonText: string;
  buttonAction: () => void;
}

const EmptyScreen = ({
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
              src={svgConf.general.empty[2].src}
              alt={svgConf.general.empty[2].name}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EmptyScreen);
