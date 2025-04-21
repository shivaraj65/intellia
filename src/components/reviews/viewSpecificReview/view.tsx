import React, {  useState } from "react";
import styles from "./view.module.scss";
import { svgConf } from "@/assets/svgConf";
import { App, Button, Input, Modal, Rate } from "antd";
import { 
  MessageOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

interface Props {
  txnLoading: boolean;
  data: any;
  blockchainFunctions: any;
}

const View = ({ txnLoading, data, blockchainFunctions }: Props) => {
  const { message: antdMessage } = App.useApp();

  const fallBackSrc = svgConf.general.empty[1].src;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const REVIEWS_PER_PAGE = 10;
  const [isReviewsLoading, setIsReviewsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<any>([]);
  const [loadedCount, setLoadedCount] = useState(0);

  const [userInput, setUserInput] = useState("");
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const [value, setValue] = useState(0);

  const showModal = async() => {
    setIsModalOpen(true);
    loadMoreReviews();
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setUserInput("");
    setValue(0);
  };

  const handleCancel = () => {
    setUserInput("");
    setValue(0);
    setIsModalOpen(false);
    setLoadedCount(0);
    setMessages([]);
  };

  // useEffect(() => {
  //   loadMoreReviews();
  // }, []);

  const fetchReviews = async (startIndex: any, count: any) => {
    const reviews = [];
    for (let i = 0; i < count; i++) {
      const currentIndex = startIndex - i;
      if (currentIndex < 0) break;
      try {
        const review = await blockchainFunctions.getReviewsByIdx(
          data.id,
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

  const loadMoreReviews = async () => {
    if (isReviewsLoading) return;
    setIsReviewsLoading(true);
    const remaining = Number(data.reviewCount) - loadedCount;
    const countToLoad = Math.min(REVIEWS_PER_PAGE, remaining);
    const startIndex = Number(data.reviewCount) - 1 - loadedCount;
    const newReviews = await fetchReviews(startIndex, countToLoad);
    setMessages((prev: any) => [...prev, ...newReviews]);
    setLoadedCount((prev) => prev + newReviews.length);
    setIsReviewsLoading(false);
  };

  const submitReview = async () => {
    const isReviewed = await blockchainFunctions.didIReview(data.id);
    if (isReviewed?.isReviewed) {
      antdMessage.open({
        type: "warning",
        content: "You have already submitted your review.",
      });
      return;
    }
    if (value !== 0 && userInput !== "") {
      const utcString = new Date().toISOString();
      await blockchainFunctions.leaveReview(
        data.id,
        userInput,
        value,
        utcString
      );
      await setLoadedCount(0);
      await setMessages([]);      
      handleCancel();
    } else {
      if (userInput !== "") {
        antdMessage.open({
          type: "warning",
          content: "Please add your review.",
        });
      } else {
        antdMessage.open({
          type: "warning",
          content: "Please add your rating.",
        });
      }
    }
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
    <div className={styles.viewPage}>
      <div className={styles.reviewCard}>
        <h3 className={styles.cardtitle}>{data.name}</h3>
        <p className={styles.carddescription}>{data.description}</p>
        {data.imageURL !== "" && (
          <div className={styles.imageContainer}>
            <img
              src={data.imageURL}
              alt={"Review Image"}
              className={styles.reviewImage}
              onError={(e) => (e.currentTarget.src = fallBackSrc)}
            />
          </div>
        )}
        {data.externalLink !== "" && (
          <a
            href={data.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.externalLink}
          >
            Visit External Link
          </a>
        )}
        <div className={styles.btnContainer}>
          <span>
            Total Reviews: <b>{data.reviewCount}</b>
          </span>
          <Button
            shape="circle"
            type="dashed"
            icon={<MessageOutlined />}
            onClick={showModal}
          />
        </div>
      </div>
      {isModalOpen && data && (
        <Modal
          key={""+data.reviewCount+data.name}
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
                        <p className={styles.date}>{formatToLocalShort(msg?.timestamp)}</p>
                      </div>
                    </div>
                  );
                })}
                {loadedCount < data.reviewCount && (
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

            <div className={styles.userInput}>
              <p>Enter your review:</p>
              <TextArea
                className={styles.inputCont}
                rows={4}
                showCount
                maxLength={500}
                value={userInput}
                onChange={(e: any) => {
                  setUserInput(e.target.value);
                }}
                placeholder="Your review"
              />
              <Rate tooltips={desc} onChange={setValue} value={value} />
              <div className={styles.btnContainer}>
                <Button
                  loading={txnLoading}
                  className={styles.submitBtn}
                  type="primary"
                  shape="round"
                  onClick={submitReview}
                >
                  Create
                </Button>
                <Button
                  className={styles.submitBtn}
                  type="default"
                  shape="round"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default React.memo(View);
