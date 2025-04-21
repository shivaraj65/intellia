import AppLayout from "@/layout/appLayout";
import { RootState } from "@/redux/store";
import { App, Button, Divider, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "@/styles/screens/reviews.module.scss";
import { useRouter } from "next/router";
import NoReviewsCreated from "@/components/reviews/noReviewsCreated/noReviewsCreated";
import AdminPage from "@/components/reviews/adminPage/adminPage";
import { reviewsContractApi } from "@/utils/contractInteraction/reviews";
// import { v4 as uuidv4 } from "uuid";
import View from "@/components/reviews/viewSpecificReview/view";

const { TextArea } = Input;

interface createProps {
  id: string;
  name: string;
  description: string;
  imageURL: string;
  externalLink: string;
}

// const MockData = [
//   {
//     id: "rev-001",
//     name: "Product Feedback: Aurora Headphones",
//     description:
//       "Collecting honest opinions and improvement ideas on the new Aurora wireless headphones.",
//     imageURL:
//       "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
//     externalLink: "https://example.com/aurora-headphones-info",
//     isDeleted: false,
//     reviewCount: 2,
//   },
//   {
//     id: "rev-002",
//     name: "Design Review: Mobile App UI",
//     description:
//       "Share your feedback on the latest mobile app UI prototype before we head to dev.",
//     imageURL: "",
//     externalLink: "",
//     isDeleted: false,
//     reviewCount: 0,
//   },
// ];

const ReviewScreen = () => {
  const router = useRouter();
  const rawId = router.query.id;
  const pId = Array.isArray(rawId) ? rawId[0] : rawId;
  const pollIdNum = pId ? parseInt(pId, 10) : null;

  const { message: antdMessage } = App.useApp();

  const accounts = useSelector((state: RootState) => state.upProvider.accounts);
  const contextAccounts = useSelector(
    (state: RootState) => state.upProvider.contextAccounts
  );
  const appInfo = useSelector((state: RootState) => state.app.appInfo);

  //applayout states...
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [txnLoading, setTxnLoading] = useState<boolean>(false);
  const [txnHash, setTxnHash] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [createData, setCreateData] = useState<createProps>({
    id: "",
    name: "",
    description: "",
    imageURL: "",
    externalLink: "",
  });
  //children states...
  const [appStats, setappStats] = useState<any>(null);

  //admin flow states...
  //Arr of current users created reviews as ID's..
  const [userReviewsID, setUserReviewsID] = useState<any>(null);
  //Arr of users all review data
  const [allReviewData, setAllReviewData] = useState<any>(null);

  //user flow states...
  //view screens data
  const [viewReviewData, setViewReviewData] = useState<any>(null);

  const blockchainFunctions = {
    create: async (
      name: string,
      description: string,
      imageURL: string,
      externalLink: string
    ) => {
      setTxnLoading(true);
      const id = userReviewsID.length;
      const data = await reviewsContractApi.create({
        topicId: id,
        title: name,
        description: description,
        imageURL: imageURL,
        externalLink: externalLink,
        accounts: accounts,
      });
      setTxnHash(data);
      antdMessage.open({
        type: "info",
        content:
          "Waits for 1 block confirmation, then returns the transaction receipt.",
      });
      console.log(txnHash); //dummy
      await blockchainFunctions.checkTxnStatus(data);
      const result: any = await blockchainFunctions.getHisReviewIds();
      if (result) {
        setUserReviewsID([...result]);
      }
      setTxnLoading(false);
      handleCancel();
    },
    leaveReview: async (
      topicId: string,
      message: string,
      rating: number,
      timestamp: string
    ) => {
      setTxnLoading(true);
      const data = await reviewsContractApi.leaveReview({
        topicId,
        message,
        rating,
        timestamp,
        accounts,
      });
      setTxnHash(data);
      antdMessage.open({
        type: "info",
        content:
          "Waits for 1 block confirmation, then returns the transaction receipt.",
      });
      await blockchainFunctions.checkTxnStatus(data);
      const metadata = await blockchainFunctions.getHisReviewMetadata(topicId);
      setViewReviewData(metadata);
      setTxnLoading(false);
    },
    didIReview: async (topicId: string) => {
      const data = await reviewsContractApi.didIReview({ topicId, accounts });
      if (typeof data === "string") {
        antdMessage.open({
          type: "warning",
          content: data,
        });
      } else {
        return data;
      }
    },
    getHisReviewIds: async () => {
      const data = await reviewsContractApi.getHisReviewIds(contextAccounts[0]);
      if (typeof data === "string") {
        antdMessage.open({
          type: "warning",
          content: data,
        });
      } else {
        return data;
      }
      return null;
    },
    getHisReviewMetadata: async (topicId: string) => {
      const data = await reviewsContractApi.getHisReviewMetadata(topicId);
      if (typeof data === "string") {
        antdMessage.open({
          type: "warning",
          content: data,
        });
      } else {
        return data;
      }
    },
    getReviewsByIdx: async (topicId: string, index: number) => {
      const data = await reviewsContractApi.getReviewsByIdx(topicId, index);
      if (typeof data === "string") {
        antdMessage.open({
          type: "warning",
          content: data,
        });
      } else {
        return data;
      }
    },
    getStats: async () => {
      const data = await reviewsContractApi.getStats();
      if (typeof data === "string") {
        antdMessage.open({
          type: "warning",
          content: data,
        });
      } else {
        setappStats(data);
      }
    },
    checkTxnStatus: async (txnId: any) => {
      const data: any = await reviewsContractApi.getTransactionStatus(txnId);
      // console.log("transaction result", data);
      if (data?.status === "success") {
        antdMessage.open({
          type: "success",
          content: "Transaction Successfull",
        });
      } else {
        antdMessage.open({
          type: "warning",
          content: "Something went wrong.",
        });
      }
      setTxnHash(null);
    },
    // linterEscaper:()=>{
    //   console.log(userReviewsID);
    //   setUserReviewsID(null);
    //   setAllReviewData(null);
    //   setViewReviewData(null);
    //   setIsUserReviewed(false);
    // }
  };

  useEffect(() => {
    // if(isDrawerOpen){
    blockchainFunctions.getStats();
    // }
  }, [accounts[0], contextAccounts[0], isDrawerOpen]);

  useEffect(() => {
    if (accounts[0] === contextAccounts[0] && userReviewsID === null) {
      (async () => {
        const result: any = await blockchainFunctions.getHisReviewIds();
        if (result) {
          setUserReviewsID([...result]);
        }
      })();
    }
  }, [accounts[0], contextAccounts[0]]);

  useEffect(() => {
    if (accounts[0] === contextAccounts[0] && userReviewsID !== null) {
      (async () => {
        const tempArr = [];
        for (let i = 0; i < userReviewsID.length; i++) {
          const result = await blockchainFunctions.getHisReviewMetadata(
            userReviewsID[i]
          );
          tempArr.push(result);
        }
        setAllReviewData([...tempArr]);
      })();
    }
  }, [accounts, contextAccounts, userReviewsID]);

  useEffect(() => {
    if (accounts[0] !== contextAccounts[0] && pollIdNum) {
      (async () => {
        const res = await blockchainFunctions.getHisReviewMetadata(
          pollIdNum.toString()
        );
        setViewReviewData(res);
      })();
    }
  }, [accounts[0], contextAccounts[0]]);

  const DrawerContents = (): React.ReactNode => {
    return (
      <div className={styles.drawerContent}>
        <div className={styles.subAppInfo}>
          <h3 className={styles.accentText + " title"}>Reviews</h3>
          <p className={styles.description + " font2"}>
            Read. Reflect. Decide.
          </p>
        </div>
        <Divider orientation="right">App Metrics</Divider>
        <div className={styles.metrics}>
          {appStats && (
            <React.Fragment>
              <div className={styles.metric}>
                <span
                  className={
                    styles.label + " " + styles["secondaryText"] + " font1"
                  }
                >
                  📝 Reviews Posts created
                </span>
                <span className={styles.value + " font2"}>
                  {appStats?.totalCreatedTopics}
                </span>
              </div>

              <div className={styles.metric}>
                <span
                  className={
                    styles.label + " " + styles["secondaryText"] + " font1"
                  }
                >
                  👥 Total Registered Users
                </span>
                <span className={styles.value + " font2"}>
                  {appStats?.totalRegisteredUsers}
                </span>
              </div>

              <div className={styles.metric}>
                <span
                  className={
                    styles.label + " " + styles["secondaryText"] + " font1"
                  }
                >
                  🪶 Total Submitted Reviews
                </span>
                <span className={styles.value + " font2"}>
                  {appStats?.totalSubmittedReviews}
                </span>
              </div>
            </React.Fragment>
          )}
        </div>
        <Divider />
        <div className={styles.footer}>
          <a
            href={appInfo?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mainapp-banner-link"
          >
            More About This App
          </a>
        </div>
      </div>
    );
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setCreateData({
      id: "",
      name: "",
      description: "",
      imageURL: "",
      externalLink: "",
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setCreateData({
      id: "",
      name: "",
      description: "",
      imageURL: "",
      externalLink: "",
    });
    setIsModalOpen(false);
  };

  const validateCreate = () => {
    const { name, description } = createData;
    if (!name.trim()) {
      antdMessage.open({
        type: "warning",
        content: "Please enter a title for your review.",
      });
      return false;
    }

    if (!description.trim()) {
      antdMessage.open({
        type: "warning",
        content: "Please add a short description.",
      });
      return false;
    }
    return true;
  };

  return (
    <div className={styles.reviewComponent}>
      <AppLayout
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        drawerComtent={<DrawerContents />}
      >
        {/* {contextAccounts && <p>{contextAccounts[0]}</p>}
        {accounts && <p>{accounts[0]}</p>} */}

        {/* {test && (
          <span>
            {typeof test === "string" || typeof test === "number" ? (
              test
            ) : (
              <pre>
                {JSON.stringify(
                  test,
                  (_key, value) =>
                    typeof value === "bigint" ? value.toString() : value,
                  2
                )}
              </pre>
            )}
          </span>
        )}         */}
        {/* <View
          data={{
            id: "rev-001",
            name: "Product Feedback: Aurora Headphones",
            description:
              "Collecting honest opinions and improvement ideas on the new Aurora wireless headphones.",
            imageURL:
              "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
            externalLink: "https://example.com/aurora-headphones-info",
            isDeleted: false,
            reviewCount: 2,
          }}
          blockchainFunctions={blockchainFunctions}
          txnLoading={txnLoading}
        /> */}

        {contextAccounts[0] === accounts[0] ? (
          //admin pages...
          <React.Fragment>
            {allReviewData && allReviewData.length > 0 ? (
              <AdminPage
                reviewsData={allReviewData}
                floatingButtonAction={showModal}
                blockchainFunctions={blockchainFunctions}
              />
            ) : (
              <NoReviewsCreated
                message={`Great ideas deserve great feedback. Start your first review and invite others to share their thoughts!`}
                title={"No Reviews Yet"}
                buttonText={"Create a Review"}
                buttonAction={() => {
                  showModal();
                }}
              />
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {pollIdNum && viewReviewData ? (
              <View
                data={viewReviewData}
                blockchainFunctions={blockchainFunctions}
                txnLoading={txnLoading}
              />
            ) : (
              <NoReviewsCreated
                message={
                  pollIdNum
                    ? `Loading the review... Getting everything ready for you to dive in!`
                    : "The creator is still setting up this review. Check back soon to share your thoughts!"
                }
                title={pollIdNum ? "Setting Things Up..." : "Almost There..."}
                buttonText={""}
              />
            )}
          </React.Fragment>
        )}

        {/* //create review modal here */}
        {contextAccounts[0] === accounts[0] && (
          <Modal
            className={styles.createReviewTopic}
            title="Create a Review"
            style={{ top: 20 }}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <div className={styles.container}>
              <span className={styles.label + " font2"}>
                What’s the title of your review?
              </span>
              <Input
                className={styles.input + " font1"}
                showCount
                maxLength={50}
                placeholder="Give your review a clear, catchy title"
                value={createData.name}
                onChange={(e) => {
                  setCreateData({
                    ...createData,
                    name: e.target.value,
                  });
                }}
              />
              <span className={styles.label + " font2"}>
                Add a short description
              </span>
              <TextArea
                className={styles.inputCont}
                rows={3}
                showCount
                maxLength={500}
                value={createData.description}
                onChange={(e: any) => {
                  setCreateData({
                    ...createData,
                    description: e.target.value,
                  });
                }}
                placeholder="Describe what this review is about or what kind of feedback you want"
              />
              <span className={styles.label + " font2"}>
                Add an image (optional)
              </span>
              <Input
                className={styles.input + " font1"}
                showCount
                maxLength={200}
                placeholder="Paste a link to an image that fits your review"
                value={createData.imageURL}
                onChange={(e) => {
                  setCreateData({
                    ...createData,
                    imageURL: e.target.value,
                  });
                }}
              />
              <span className={styles.label + " font2"}>
                Add a link (optional)
              </span>
              <Input
                className={styles.input + " font1"}
                showCount
                maxLength={300}
                placeholder="Add a supporting link (e.g., website, doc, resource)"
                value={createData.externalLink}
                onChange={(e) => {
                  setCreateData({
                    ...createData,
                    externalLink: e.target.value,
                  });
                }}
              />
              <div className={styles.btnContainer}>
                <Button
                  loading={txnLoading}
                  className={styles.submitBtn}
                  type="primary"
                  shape="round"
                  onClick={async () => {
                    if (validateCreate()) {
                      blockchainFunctions.create(
                        createData.name,
                        createData.description,
                        createData.imageURL,
                        createData.externalLink
                      );
                    }
                  }}
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
          </Modal>
        )}
      </AppLayout>
    </div>
  );
};

export default React.memo(ReviewScreen);
