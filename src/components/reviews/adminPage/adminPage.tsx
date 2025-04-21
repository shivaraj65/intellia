import React, { useEffect, useState } from "react";
import styles from "./adminPage.module.scss";
import Image from "next/image";
import { svgConf } from "@/assets/svgConf";
import { App, Button, FloatButton, Modal, Rate } from "antd";
import {
  CopyOutlined,
  DeleteOutlined,
  FullscreenOutlined,
  PlusOutlined,
} from "@ant-design/icons";

interface Props {
  reviewsData: any;
  floatingButtonAction: () => void;
  blockchainFunctions: any;
}

const AdminPage = ({
  reviewsData,
  floatingButtonAction,
  blockchainFunctions,
}: Props) => {
  const { message: antdMessage } = App.useApp();

  const fallBackSrc = svgConf.general.empty[1].src;

  const [isReviewsLoading, setIsReviewsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCardData, setselectedCardData] = useState<any>(null);

  const REVIEWS_PER_PAGE = 10;
  const [messages, setMessages] = useState<any>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];

  const showModal = async () => {
    setIsModalOpen(true);    
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setselectedCardData(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setLoadedCount(0);
    setMessages([]);
    setselectedCardData(null);
  };

  const fetchReviews = async (startIndex: any, count: any) => {
    const reviews = [];
    for (let i = 0; i < count; i++) {
      const currentIndex = startIndex - i;
      if (currentIndex < 0) break;
      try {
        const review = await blockchainFunctions.getReviewsByIdx(
          selectedCardData.id,
          currentIndex
        );
        reviews.push(review);
      } catch (err) {
        console.log(err);
        antdMessage.open({
          type: "warning",
          content: "Error fetching review.",
        });
      }
    }

    return reviews;
  };

  useEffect(() => {
   if(selectedCardData){
    loadMoreReviews();
   }
  }, [selectedCardData])
  
  const loadMoreReviews = async () => {
    if (isReviewsLoading) return;
    setIsReviewsLoading(true);
    const remaining = Number(selectedCardData.reviewCount) - loadedCount;
    const countToLoad = Math.min(REVIEWS_PER_PAGE, remaining);
    const startIndex = Number(selectedCardData.reviewCount) - 1 - loadedCount;
    const newReviews = await fetchReviews(startIndex, countToLoad);
    setMessages((prev: any) => [...prev, ...newReviews]);
    setLoadedCount((prev) => prev + newReviews.length);
    setIsReviewsLoading(false);
  };

  function formatToLocalShort(utcTimestamp:string) {
    const date = new Date(utcTimestamp);
    return date.toLocaleString(undefined, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).replace(',', '');
  }
  

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
                  <div>
                    <span>
                      ID: {reviewsData.length - index - 1}{" "}
                      <Button
                        shape="circle"
                        type="dashed"
                        icon={<CopyOutlined />}
                        onClick={() => {
                          const url = `https://intellia-widgets.vercel.app/polls/${index}`;
                          navigator.clipboard
                            .writeText(url)
                            .then(() => {
                              antdMessage.open({
                                type: "success",
                                content: "Link copied to clipboard!",
                              });
                            })
                            .catch(() => {
                              antdMessage.open({
                                type: "warning",
                                content: "Failed to copy to clipboard!",
                              });
                            });
                        }}
                      />
                    </span>
                    <Button
                      shape="circle"
                      type="dashed"
                      icon={<FullscreenOutlined />}
                      onClick={async() => {
                        setselectedCardData(review);
                        showModal();
                      }}
                    />
                  </div>
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

      {isModalOpen && selectedCardData && (
        <Modal
          className={styles.viewReviews}
          title="Post Reviews"
          style={{ top: 20 }}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <div className={styles.container}>
            {messages && messages.length > 0 && (
              <div className={styles.messagesContainer}>
                {messages.map((msg: any, index: number) => {
                  return (
                    <div key={index + msg.timestamp} className={styles.msg}>
                      <p>{msg?.message}</p>
                      <span className={styles.ratingContainer}>{}</span>
                      <Rate
                        className={styles.rating}
                        tooltips={desc}
                        value={msg?.rating}
                        disabled
                      />
                      <div className={styles.footer}>
                        <p className={styles.name}>Anonymous user</p>
                        <p className={styles.date}>
                          {formatToLocalShort(msg?.timestamp)}
                        </p>
                      </div>
                    </div>
                  );
                })}
                {loadedCount < Number(selectedCardData.reviewCount) && (
                  <div className={styles.loadmorecont}>
                    <Button
                      size="small"
                      type="link"
                      onClick={loadMoreReviews}
                      disabled={isReviewsLoading}
                      className={styles.loadmore}
                    >
                      {isReviewsLoading ? "Loading..." : "Load More"}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default React.memo(AdminPage);
