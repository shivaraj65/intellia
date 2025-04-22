"use client";

import { RootState } from "@/redux/store";
// import Image from "next/image";
import { App, Button, Divider, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "@/styles/screens/pollsScreen.module.scss";
import AppLayout from "@/layout/appLayout";
import NoPollsCreated from "@/components/polls/noPollsCreated/NoPollsCreated";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import PollAdmin from "@/components/polls/adminPage/pollAdmin";
import { pollsContractApi } from "@/utils/contractInteraction/polls";
import { v4 as uuidv4 } from "uuid";
import ViewPoll from "@/components/polls/viewSpecificPoll/viewSpecificPoll";
import { useRouter } from "next/router";

const { TextArea } = Input;

// const mocPollData = [
//   {
//     name: "Team Lunch Poll",
//     description: "What should we have for the team lunch this Friday?",
//     options: ["Pizza 🍕", "Sushi 🍣", "", "", ""],
//     votes: [0, 0, 0, 0, 0],
//     creator: "0xA3f4d6098fcF44CD9273B5323f43be13C45966b7",
//   },
//   {
//     name: "Favorite Programming Language",
//     description:
//       "Help us decide the most loved programming language of the year!",
//     options: ["JavaScript", "Python", "Go", "Rust"],
//     votes: [18, 25, 7, 10],
//     creator: "alice_dev",
//   },
//   {
//     name: "Team Outing Preference",
//     description: "Vote for your favorite type of team outing activity.",
//     options: ["Bowling", "Escape Room", "Picnic", "Cooking Class"],
//     votes: [12, 9, 15, 4],
//     creator: "team_hr",
//   },
//   {
//     name: "Next Book Club Pick",
//     description: "Choose the book you'd love to read next month!",
//     options: ["1984", "Sapiens", "The Alchemist"],
//     votes: [8, 14, 11],
//     creator: "book_lover22",
//   },
// ];

const PollsScreen = () => {
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  //create modal states.
  type CreatePollData = {
    id: string;
    title: string;
    question: string;
    options: string[];
    optionsCount: number;
  };
  const [createData, setCreateData] = useState<CreatePollData>({
    id: "",
    title: "",
    question: "",
    options: ["", "", "", "", ""],
    optionsCount: 2,
  });
  const damnRerenders = [1, 2, 3, 4, 5]; //eat this 😂

  //children states...
  const [appStats, setappStats] = useState<any>(null);

  // specific users polls data -meta data arr of ID's
  const [userPollIds, setUserPollIds] = useState<string[]>([]);
  //all polls data
  const [allPollsData, setAllPollsData] = useState<any[]>([]);
  //user's voted status for poll
  const [isUserVoted, setIsUserVoted] = useState<any>(null);

  //for a specific poll - for users - /[id route spec]
  const [pollData, setPollData] = useState<any>(null);

  const [txnHash, setTxnHash] = useState<any>(null);

  const blockchainFunctions = {
    create: async (
      pollId: string,
      title: string,
      question: string,
      options: string[]
    ) => {
      setTxnLoading(true);
      const data = await pollsContractApi.createPoll({
        pollId: pollId,
        name: title,
        description: question,
        options: options,
        accounts,
      });
      setTxnHash(data);
      antdMessage.open({
        type: "info",
        content:
          "Waits for 1 block confirmation, then returns the transaction receipt.",
      });
      console.log(txnHash); //dummy
      await blockchainFunctions.checkTxnStatus(data);
      await blockchainFunctions.getUserPolls();
      setTxnLoading(false);
      handleCancel();
    },
    vote: async (pollId: string, optionsIndex: number) => {
      setTxnLoading(true);
      const data = await pollsContractApi.vote({
        pollId,
        optionsIndex,
        accounts,
      });
      setTxnHash(data);
      antdMessage.open({
        type: "info",
        content:
          "Waits for 1 block confirmation, then returns the transaction receipt.",
      });
      await blockchainFunctions.checkTxnStatus(data);
      const res = await blockchainFunctions.isUserVoted(pollId);
      if (pollIdNum) {
        const result: any = await blockchainFunctions.getPollData(
          userPollIds[pollIdNum-1]
        );
        // Convert BigInt fields safely (like votes)
        const cleaned = {
          ...result,
          votes: result.votes.map((v: bigint | string) => Number(v)),
        };
        setPollData({ ...cleaned });
      }
      setIsUserVoted({ ...res });
      setTxnLoading(false);
    },
    getUserPolls: async () => {
      const data = await pollsContractApi.getPollDataByUser({
        profileAccount: contextAccounts[0],
      });
      if (typeof data === "string") {
        antdMessage.open({
          type: "warning",
          content: data,
        });
      } else if (data) {
        console.log("data from the api", data?.data);
        setUserPollIds(data?.data);
      }
    },
    getPollData: async (pollId: string) => {
      const data = await pollsContractApi.getPollData({
        pollId: pollId,
      });
      if (typeof data === "string") {
        antdMessage.open({
          type: "warning",
          content: data,
        });
      } else {
        return data;
      }
    },
    isUserVoted: async (pollId: string) => {
      const data = await pollsContractApi.getUsersVoteStatus({
        pollId: pollId,
        accounts: accounts,
      });
      if (typeof data === "string") {
        antdMessage.open({
          type: "warning",
          content: data,
        });
      } else {
        return data;
      }
    },
    getTotalVotesForPoll: async (pollId: string) => {
      const data = await pollsContractApi.getTotalVotes({
        pollId: pollId,
      });
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
      const data = await pollsContractApi.getStats();
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
      const data: any = await pollsContractApi.getTransactionStatus(txnId);
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
  };

  useEffect(() => {
    // if(isDrawerOpen){
    blockchainFunctions.getStats();
    // }
  }, [accounts, contextAccounts, isDrawerOpen]);

  useEffect(() => {
    blockchainFunctions.getUserPolls();
  }, [accounts, contextAccounts]);

  useEffect(() => {
    (async () => {
      if (
        pollIdNum &&
        pollIdNum > 0 &&
        userPollIds.length > 0 &&
        pollIdNum <= userPollIds.length
      ) {
        //fethc the specific pollData and set it to state

        const result: any = await blockchainFunctions.getPollData(
          userPollIds[pollIdNum -1]
        );
        // Convert BigInt fields safely (like votes)
        const cleaned = {
          ...result,
          votes: result.votes.map((v: bigint | string) => Number(v)),
        };
        setPollData(cleaned);
      }
    })();
  }, [accounts, contextAccounts, pollIdNum, userPollIds]);

  useEffect(() => {
    if (pollData) {
      (async () => {
        const result = await blockchainFunctions.isUserVoted(pollData.id);
        setIsUserVoted({ ...result });
      })();
    }
  }, [accounts, contextAccounts, pollData]);

  //fetch the pollData for every POLL ID's
  useEffect(() => {
    if (userPollIds.length > 0) {
      fetchAllP();
    }
  }, [accounts, contextAccounts, userPollIds]);

  const fetchAllP = async () => {
    const updateData: any[] = [];
    for (let i = 0; i < userPollIds.length; i++) {
      const result: any = await blockchainFunctions.getPollData(userPollIds[i]);
      // Convert BigInt fields safely (like votes)
      const cleaned = {
        ...result,
        votes: result.votes.map((v: bigint | string) => Number(v)),
      };

      await updateData.push(cleaned);
      if ((i + 1) % 5) {
        setAllPollsData([...updateData]);
      }
    }
    setAllPollsData([...updateData]);
  };

  const DrawerContents = (): React.ReactNode => {
    return (
      <div className={styles.drawerContent}>
        <div className={styles.subAppInfo}>
          <h3 className={styles.accentText + " title"}>Polls</h3>
          <p className={styles.description + " font2"}>Ask. Answer. Act.</p>
        </div>
        <Divider orientation="right">App Metrics</Divider>
        <div className={styles.metrics}>
          {appStats && (
            <div className={styles.metric}>
              <span
                className={
                  styles.label + " " + styles["secondaryText"] + " font1"
                }
              >
                🔥 Polls Sparked by Our Users
              </span>
              <span className={styles.value + " font2"}>
                {appStats?.totalPollsCreated}
              </span>
            </div>
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
      title: "",
      question: "",
      options: ["", "", "", "", ""],
      optionsCount: 2,
    });

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setCreateData({
      id: "",
      title: "",
      question: "",
      options: ["", "", "", "", ""],
      optionsCount: 2,
    });
    setIsModalOpen(false);
  };

  const validateCreate = () => {
    const { title, question, options, optionsCount } = createData;
    if (!title.trim()) {
      antdMessage.open({
        type: "warning",
        content: "Please give your poll a title.",
      });
      return false;
    }
    if (!question.trim()) {
      antdMessage.open({
        type: "warning",
        content: "Please enter the main question you want to ask.",
      });
      return false;
    }

    const visibleOptions = options.slice(0, optionsCount);
    const areAllOptionsFilled = visibleOptions.every(
      (opt) => opt.trim() !== ""
    );
    if (!areAllOptionsFilled) {
      antdMessage.open({
        type: "warning",
        content: `Please fill out all ${optionsCount} option${
          optionsCount > 1 ? "s" : ""
        }.`,
      });
      return false;
    }

    return true;
  };

  return (
    <div className={styles.PollsContainer}>
      <AppLayout
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        drawerComtent={<DrawerContents />}
      >
        <React.Fragment>
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
          )} */}
          {/* <h2>Poll ID: {rawId ? rawId : "No ID"}</h2> */}
          {/* <ViewPoll
            loading={txnLoading}
            pollData={{
              name: "Team Lunch Poll",
              description:
                "What should we have for the team lunch this Friday?",
              options: ["Pizza 🍕", "Sushi 🍣"],
              votes: [10, 6],
              creator: "0xA3f4d6098fcF44CD9273B5323f43be13C45966b7",
            }}
            isUserVoted={{
              isvoted: true,
              option: 1,
            }}
            blockchainFunctions={blockchainFunctions}
          /> */}

          {/* <PollAdmin pollData={mocPollData} floatingButtonAction={showModal} /> */}

          {contextAccounts[0] === accounts[0] ? (
            //admin pages...
            <React.Fragment>
              {allPollsData && allPollsData.length > 0 ? (
                <PollAdmin
                  pollData={allPollsData}
                  floatingButtonAction={showModal}
                />
              ) : (
                <NoPollsCreated
                  message={
                    "Great ideas deserve great feedback. Kickstart your first poll now!"
                  }
                  title={"No Polls in Sight"}
                  buttonText={"Make a Poll"}
                  buttonAction={() => {
                    showModal();
                  }}
                />
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {pollIdNum && pollData && isUserVoted ? (
                <ViewPoll
                  loading={txnLoading}
                  pollData={pollData}
                  isUserVoted={isUserVoted}
                  blockchainFunctions={blockchainFunctions}
                />
              ) : (
                <NoPollsCreated
                  message={
                    pollIdNum
                      ? `Poll is loading up. The ideas are brewing — almost ready to roll!`
                      : "Hang tight! Poll is warming up behind the scenes. The creator's making final touches — check back shortly!"
                  }
                  title={pollIdNum ? "Setting Things Up..." : "Almost There..."}
                  buttonText={""}
                />
              )}
            </React.Fragment>
          )}
          {contextAccounts[0] === accounts[0] && (
            <Modal
              className={styles.createPoll}
              title="Create a Poll"
              style={{ top: 20 }}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
            >
              <div className={styles.container}>
                <span className={styles.label + " font2"}>
                  Give your poll a name
                </span>
                <Input
                  className={styles.input + " font1"}
                  showCount
                  maxLength={40}
                  placeholder="What's this poll about?"
                  value={createData.title}
                  onChange={(e) => {
                    setCreateData({
                      ...createData,
                      title: e.target.value,
                    });
                  }}
                />
                <span className={styles.label + " font2"}>
                  What's the big question?
                </span>
                <TextArea
                  className={styles.inputCont}
                  rows={3}
                  showCount
                  maxLength={300}
                  value={createData.question}
                  onChange={(e: any) => {
                    setCreateData({
                      ...createData,
                      question: e.target.value,
                    });
                  }}
                  placeholder="Your main question goes here"
                />
                <span className={styles.label + " font2"}>
                  Add your choices here
                </span>

                {damnRerenders
                  .slice(0, createData.optionsCount)
                  .map((mockdata: number, index: number) => {
                    return (
                      <div
                        key={index + mockdata}
                        className={styles.optionWrapper}
                      >
                        <Input
                          className={styles.input + " font1"}
                          showCount
                          maxLength={80}
                          placeholder={`Option ${index + 1}`}
                          value={createData.options[index]}
                          onChange={(e) => {
                            const tempOptions = createData.options;
                            tempOptions[index] = e.target.value;
                            setCreateData({
                              ...createData,
                              options: tempOptions,
                            });
                          }}
                        />
                        <Button
                          shape="circle"
                          type="dashed"
                          icon={<DeleteOutlined />}
                          disabled={createData.optionsCount <= 2}
                          onClick={() => {
                            if (createData.optionsCount > 0) {
                              //index - remove this index from createData.options
                              setCreateData((prevData) => {
                                const updatedOptions = prevData.options.filter(
                                  (_, idx) => idx !== index
                                );
                                updatedOptions.push("");
                                return {
                                  ...prevData,
                                  options: updatedOptions,
                                  optionsCount: prevData.optionsCount - 1,
                                };
                              });
                            }
                          }}
                        />
                      </div>
                    );
                  })}

                <Button
                  className={styles.addBtn}
                  shape="circle"
                  type="dashed"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    if (createData.optionsCount < 5) {
                      setCreateData((prevData) => {
                        return {
                          ...prevData,
                          optionsCount: prevData.optionsCount + 1,
                        };
                      });
                    } else {
                      antdMessage.open({
                        type: "warning",
                        content:
                          "Whoops! You've hit the limit. Only 5 options are allowed.",
                      });
                    }
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
                        const cleanedOptions = createData.options.filter(
                          (opt) => opt.trim() !== ""
                        );

                        await blockchainFunctions.create(
                          uuidv4(),
                          createData.title,
                          createData.question,
                          cleanedOptions
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
        </React.Fragment>
      </AppLayout>
    </div>
  );
};

export default React.memo(PollsScreen);
