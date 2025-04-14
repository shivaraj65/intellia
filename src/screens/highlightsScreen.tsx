"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/screens/highlightsScreen.module.scss";
import AppLayout from "@/layout/appLayout";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {  Divider, message } from "antd";
import EmptyScreen from "@/components/common/empty-screens/emptyScreen";
import NoContent from "@/components/common/empty-screens/emptyContent";
import CreateHighlights from "@/components/highlights/createHighlights/createHighlight";
import CarouselComp from "@/components/highlights/carousel/carousel";
import { contractApi } from "@/utils/contractInteraction/highlights";

const HighlightScreen = () => {
  const accounts = useSelector((state: RootState) => state.upProvider.accounts);
  const contextAccounts = useSelector(
    (state: RootState) => state.upProvider.contextAccounts
  );
  const appInfo = useSelector((state: RootState) => state.app.appInfo);

  //applayout states...
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  //0 - empty screen / 1- create page /
  const [currentAdminScreen, setCurrentAdminScreen] = useState<number>(0);

  //children states...
  const [appStats, setappStats] = useState<any>(null);
  const [HighlightData, setHighlightData] = useState<any>(null);

  useEffect(() => {
    blockchainFunctions.getStats();
  }, [accounts, contextAccounts]);

  useEffect(() => {
    if (contextAccounts && contextAccounts.length > 0) {
      blockchainFunctions.getHighlights();
    }
  }, [contextAccounts]);

  const blockchainFunctions = {
    requestConnect: async () => {
      const data = await contractApi.requestConnection();
      console.log("data from get stats", data);
    },
    getStats: async () => {
      const data = await contractApi.getStats();
      console.log("stats data---", data);
      if (typeof data === "string") {
        message.open({
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
        message.open({
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
      const data = await contractApi.createYourHighlight({
        name: name,
        description: description,
        icon: icon,
        accounts: accounts,
      });
      console.log("data from get stats", data);
    },
    addMessage: async (message: string) => {
      const data = await contractApi.addMessageForHighlight({
        highlightAddress: contextAccounts[0],
        messageText: message,
        accounts: accounts,
      });
      console.log("data from create request", data);

      //we will receive a txn id. try to capture the id and make a iterative call no next function to get tit updated..
    },
    checkTransactionCompleted: async (txnId: string) => {
      //validate the txn and return the result...
      console.log(txnId)
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
        {
          contextAccounts && <p>{contextAccounts[0]}</p>
        }
        {
          accounts && <p>{accounts[0]}</p>
        }
        {contextAccounts[0] === accounts[0] ? (
          // admin route
          <React.Fragment>
            {HighlightData ? (
              <CarouselComp
                HighlightData={HighlightData}
                blockchainFunctions={blockchainFunctions}
              />
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
              <CreateHighlights blockchainFunctions={blockchainFunctions} />
            ) : (
              <></>
            )}
          </React.Fragment>
        ) : (
          // users route
          <React.Fragment>
            {HighlightData && HighlightData?.messages.length > 0 ? (
              <CarouselComp
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
