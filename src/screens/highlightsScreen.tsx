"use client";

import React, { useState } from "react";
import styles from "@/styles/screens/highlightsScreen.module.scss";
import AppLayout from "@/layout/appLayout";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Divider } from "antd";
import EmptyScreen from "@/components/common/empty-screens/emptyScreen";
import NoContent from "@/components/common/empty-screens/emptyContent";

const HighlightScreen = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // const accounts = useSelector((state: RootState) => state.upProvider.accounts);
  const appInfo = useSelector((state: RootState) => state.app.appInfo);

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
          <div className={styles.metric}>
            <span
              className={
                styles.label + " " + styles["secondaryText"] + " font1"
              }
            >
              👤 Total Users
            </span>
            <span className={styles.value + " font2"}>{123}</span>
          </div>
          <div className={styles.metric}>
            <span
              className={
                styles.label + " " + styles["secondaryText"] + " font1"
              }
            >
              💬 Total Messages
            </span>
            <span className={styles.value + " font2"}>{12}</span>
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
        {/* <EmptyScreen
          message={"Get started by creating a highlight."}
          title={"No highlights"}
          buttonText={"Get Started"}
          buttonAction={function (): void {
            throw new Error("Function not implemented.");
          }}
        /> */}
        <NoContent
          message={
            "Be the first to add something special about them."
          }
          title={"Make It Memorable"}
          buttonText={"Got a Moment?"}
          buttonAction={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        {/* {accounts?.length > 0 &&
          accounts.map((item) => {
            return <p key={item}>{item}</p>;
          })} */}
      </AppLayout>
    </div>
  );
};

export default React.memo(HighlightScreen);
