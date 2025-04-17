import { RootState } from "@/redux/store";
import Image from "next/image";
import { App, Button, Divider, Input, Modal } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "@/styles/screens/pollsScreen.module.scss";
import AppLayout from "@/layout/appLayout";
import NoPollsCreated from "@/components/polls/noPollsCreated/NoPollsCreated";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import PollAdmin from "@/components/polls/adminPage/pollAdmin";

const { TextArea } = Input;

const mocPollData = [
  {
    name: "Favorite Programming Language",
    description:
      "Help us decide the most loved programming language of the year!",
    options: ["JavaScript", "Python", "Go", "Rust"],
    votes: [18, 25, 7, 10],
    creator: "alice_dev",
  },
  {
    name: "Team Outing Preference",
    description: "Vote for your favorite type of team outing activity.",
    options: ["Bowling", "Escape Room", "Picnic", "Cooking Class"],
    votes: [12, 9, 15, 4],
    creator: "team_hr",
  },
  {
    name: "Next Book Club Pick",
    description: "Choose the book you'd love to read next month!",
    options: ["1984", "Sapiens", "The Alchemist"],
    votes: [8, 14, 11],
    creator: "book_lover22",
  },
];

const PollsScreen = () => {
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

  //0 - empty screen / 1- create page /
  const [currentAdminScreen, setCurrentAdminScreen] = useState<number>(0);

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
  const [pollData, setPollData] = useState<any>(null);

  const [txnHash, setTxnHash] = useState<any>(null);

  const blockchainFunctions = {};

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
                {appStats?.totalUsers}
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
    setIsModalOpen(false);
  };

  const handleCancel = () => {
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
          {/* {txnHash && (
            <span>
              {typeof txnHash === "string" || typeof txnHash === "number" ? (
                txnHash
              ) : (
                <pre>
                  {JSON.stringify(
                    txnHash,
                    (_key, value) =>
                      typeof value === "bigint" ? value.toString() : value,
                    2
                  )}
                </pre>
              )}
            </span>
          )} */}

          {/* [1] */}
          {/* <NoPollsCreated
            message={
              "Great ideas deserve great feedback. Kickstart your first poll now!"
            }
            title={"No Polls in Sight"}
            buttonText={"Make a Poll"}
            buttonAction={() => {
              setCurrentAdminScreen(1);
            }}
          /> */}

          {/* [3] */}
          <PollAdmin pollData={mocPollData} floatingButtonAction={showModal} />

          {contextAccounts[0] === accounts[0] ? (
            //admin pages...

            //user copies widget - no polls available [1]

            //create poll page... [2] -modal- look down

            //admin monitor page..where all polls created show up. [3]
            //popup for every single poll data. [4]
            //preview window.[5]
            <></>
          ) : (
            //user pages...
            //view poll data - scroll window but not auto scroll. [6]
            //view specific poll data - only.[7]
            //vote confirmation popup. [8]
            <></>
          )}
          <Modal
            className={styles.createPoll}
            title="Create a Highlight"
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
                          let tempOptions = createData.options;
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
                              let updatedOptions = prevData.options.filter(
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
                      alert("valid");
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
        </React.Fragment>
      </AppLayout>
    </div>
  );
};

export default React.memo(PollsScreen);