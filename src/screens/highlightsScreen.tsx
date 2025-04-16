"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/screens/highlightsScreen.module.scss";
import AppLayout from "@/layout/appLayout";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { App, Divider } from "antd";
import EmptyScreen from "@/components/common/empty-screens/emptyScreen";
import NoContent from "@/components/common/empty-screens/emptyContent";
import CreateHighlights from "@/components/highlights/createHighlights/createHighlight";
import CarouselComp from "@/components/highlights/carousel/carousel";
import { contractApi } from "@/utils/contractInteraction/highlights";
import AdminPage from "@/components/highlights/adminPage/adminPage";

const testData = {
  name: "test name 123",
  description: "description of the highlights",
  messages: [
    {
      sender: "0x0afhoie...",
      text: "test1",
      icon: "test",
      timestamp: "",
    },
    {
      sender: "0x0afhoie...",
      text: "test2",
      icon: "test",
      timestamp: "",
    },
    {
      sender: "0x0afhoie...",
      text: "test3",
      icon: "test",
      timestamp: "",
    },
  ],
};

const HighlightScreen = () => {
  const { message: antdMessage } = App.useApp();

  const accounts = useSelector((state: RootState) => state.upProvider.accounts);
  const contextAccounts = useSelector(
    (state: RootState) => state.upProvider.contextAccounts
  );
  const appInfo = useSelector((state: RootState) => state.app.appInfo);

  //applayout states...
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [txnLoading, setTxnLoading] = useState<boolean>(false);

  //0 - empty screen / 1- create page /
  const [currentAdminScreen, setCurrentAdminScreen] = useState<number>(0);

  //children states...
  const [appStats, setappStats] = useState<any>(null);
  const [HighlightData, setHighlightData] = useState<any>(null);

  const [txnHash, setTxnHash] = useState<any>(null);
  // const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    blockchainFunctions.getStats();
  }, [accounts, contextAccounts, isDrawerOpen]);

  useEffect(() => {
    if (contextAccounts && contextAccounts.length > 0) {
      blockchainFunctions.getHighlights();
    }
  }, [contextAccounts, txnHash]);

  const blockchainFunctions = {
    requestConnect: async () => {
      const data = await contractApi.requestConnection();
      console.log("data from get stats", data);
    },
    getStats: async () => {
      const data = await contractApi.getStats();
      console.log("stats data---", data);
      if (typeof data === "string") {
        antdMessage.open({
          type: "warning",
          content: data,
        });
      } else {
        setappStats(data);
      }
    },
    getHighlights: async () => {
      const data = await contractApi.getHighlightsforUser(contextAccounts[0]);
      console.log("highlights data---", data);
      if (typeof data === "string") {
        antdMessage.open({
          type: "warning",
          content: data,
        });
      } else {
        setHighlightData(data);
      }
    },
    createHighlights: async (
      name: string,
      description: string,
      icon: string
    ) => {
      setTxnLoading(true);
      const data = await contractApi.createYourHighlight({
        name: name,
        description: description,
        icon: icon,
        accounts: accounts,
      });
      // console.log("data from get stats", data);
      antdMessage.open({
        type: "info",
        content:
          "Waits for 1 block confirmation, then returns the transaction receipt.",
      });
      await blockchainFunctions.checkTxnStatus(data);
      setTxnLoading(false);
    },
    addMessage: async (message: string,icon:string) => {
      setTxnLoading(true);      
      const data = await contractApi.addMessageForHighlight({
        highlightAddress: contextAccounts[0],
        messageText: message,
        icon:icon,
        accounts: accounts,
      });
      // console.log("data from create request", data);
      setTxnHash(data);
      antdMessage.open({
        type: "info",
        content:
          "Waits for 1 block confirmation, then returns the transaction receipt.",
      });
      await blockchainFunctions.checkTxnStatus(data);
      setTxnLoading(false);
    },
    checkTxnStatus: async (txnId: any) => {
      const data: any = await contractApi.getTransactionStatus(txnId);
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

  const DrawerContents = (): React.ReactNode => {
    return (
      <div className={styles.drawerContent}>
        <div className={styles.subAppInfo}>
          <h3 className={styles.accentText + " title"}>Highlights</h3>
          <p className={styles.description + " font2"}>
            Turn Words Into Credibility
          </p>
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
                👤 Total Users
              </span>
              <span className={styles.value + " font2"}>
                {appStats?.totalUsers}
              </span>
            </div>
          )}

          <div className={styles.metric}>
            <span
              className={
                styles.label + " " + styles["secondaryText"] + " font1"
              }
            >
              💬 Total Messages
            </span>
            <span className={styles.value + " font2"}>
              {appStats?.totalMessages}
            </span>
          </div>
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

  return (
    <div className={styles.highlightsContainer}>
      <AppLayout
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        drawerComtent={<DrawerContents />}
      >
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
        <CarouselComp
          txnLoading={txnLoading}
          HighlightData={HighlightData}
          blockchainFunctions={blockchainFunctions}
        />

        {contextAccounts[0] === accounts[0] ? (
          // admin route
          <React.Fragment>
            {HighlightData ? (
              <React.Fragment>
                {currentAdminScreen === 1 ? (
                  <CreateHighlights
                    txnLoading={txnLoading}
                    blockchainFunctions={blockchainFunctions}
                  />
                ) : (
                  <AdminPage
                    HighlightData={testData}                  
                    buttonAction={() => {
                      setCurrentAdminScreen(1);
                    }}
                  />
                )}
              </React.Fragment>
            ) : currentAdminScreen === 0 ? (
              <EmptyScreen
                message={"Get started by creating a highlight."}
                title={"No highlights"}
                buttonText={"Get Started"}
                buttonAction={() => {
                  setCurrentAdminScreen(1);
                }}
              />
            ) : currentAdminScreen === 1 ? (
              <CreateHighlights
                txnLoading={txnLoading}
                blockchainFunctions={blockchainFunctions}
              />
            ) : (
              <></>
            )}
          </React.Fragment>
        ) : (
          // users route
          <React.Fragment>
            {HighlightData && HighlightData?.messages.length > 0 ? (
              <CarouselComp
                txnLoading={txnLoading}
                HighlightData={HighlightData}
                blockchainFunctions={blockchainFunctions}
              />
            ) : (
              <NoContent
                message={"Be the first to add something special about them."}
                title={"Make It Memorable"}
                buttonText={"Got a Moment?"}
                blockchainFunctions={blockchainFunctions}
              />
            )}
          </React.Fragment>
        )}
      </AppLayout>
    </div>
  );
};

export default React.memo(HighlightScreen);
