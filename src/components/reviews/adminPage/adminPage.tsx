import React from "react";
import styles from "./adminPage.module.scss";
import Image from "next/image";
import { svgConf } from "@/assets/svgConf";
import { Button, FloatButton } from "antd";
import {
  DeleteOutlined,
  FullscreenOutlined,
  PlusOutlined,
} from "@ant-design/icons";

interface Props {
  reviewsData: any;
  floatingButtonAction: () => void;
}

const AdminPage = ({ reviewsData, floatingButtonAction }: Props) => {
  const fallBackSrc = svgConf.general.empty[1].src;
  return (
    <div className={styles.adminPage}>
      <h3 className={styles.title + " font1"}>Your Reviews Dashboard</h3>
      <p className={styles.description + " font2"}>
        View and manage all the reviews you've created. Track feedback, update
        content, and keep everything organized in one place.
      </p>
      {reviewsData && reviewsData.length === 0 && (
        <div className={styles.emptyImage}>
          <Image
            src={svgConf.general.empty[1].src}
            alt={svgConf.general.empty[1].src}
            className={styles.image}
          />
          <p className={styles.imageText}>
            Looks a little quiet... Start your first review!
          </p>
        </div>
      )}
      {reviewsData &&
        reviewsData.length !== 0 &&
        reviewsData
          ?.slice()
          ?.reverse()
          .map((review: any, index: number) => {
            return (
              <div key={review.id + index} className={styles.reviewCard}>
                <h3 className={styles.cardtitle}>{review.name}</h3>
                <p className={styles.carddescription}>{review.description}</p>
                {review.imageURL !== "" && (
                  <div className={styles.imageContainer}>
                    <img
                      src={review.imageURL}
                      alt={"Review Image"}
                      className={styles.reviewImage}
                      onError={(e) => (e.currentTarget.src = fallBackSrc)}
                    />
                  </div>
                )}
                {review.externalLink !== "" && (
                  <a
                    href={review.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.externalLink}
                  >
                    Visit External Link
                  </a>
                )}
                <div className={styles.footerContainer}>
                  <Button
                    shape="circle"
                    type="dashed"
                    disabled={true}
                    icon={<DeleteOutlined />}
                    onClick={() => {}}
                  />
                  <Button
                    shape="circle"
                    type="dashed"
                    icon={<FullscreenOutlined />}
                    onClick={() => {}}
                  />
                </div>
              </div>
            );
          })}

      <FloatButton
        icon={<PlusOutlined />}
        style={{ bottom: 12, right: 12 }}
        tooltip={<div>Create a new Review</div>}
        onClick={() => {
          floatingButtonAction();
        }}
      />
    </div>
  );
};

export default React.memo(AdminPage);
