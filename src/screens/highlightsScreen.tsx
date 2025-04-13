"use client";

import React, { useState } from "react";
import styles from "@/styles/screens/highlightsScreen.module.scss";
import AppLayout from "@/layout/appLayout";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button, Divider } from "antd";
// import EmptyScreen from "@/components/common/empty-screens/emptyScreen";
// import NoContent from "@/components/common/empty-screens/emptyContent";
// import CreateHighlights from "@/components/highlights/createHighlights/createHighlight";
// import CarouselComp from "@/components/highlights/carousel/carousel";
import { contractApi } from "@/utils/contractInteraction/highlights";

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

  const [dummyDisplay, setDummyDisplay] = useState<any>(null);

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
        {/* <NoContent
          message={
            "Be the first to add something special about them."
          }          
          title={"Make It Memorable"}
          buttonText={"Got a Moment?"}
          buttonAction={function (): void {
            throw new Error("Function not implemented.");
          }}
        /> */}

        {/* <CreateHighlights/> */}
        <Button
          onClick={async () => {
            const data = await contractApi.getStats();
            console.log("data from get stats", data);
            setDummyDisplay(data);
          }}
        >
          Get Status
        </Button>
        <Button
          onClick={async () => {
            const data = await contractApi.getHighlightsforUser('0xA3f4d6098fcF44CD9273B5323f43be13C45966b7');
            console.log("data from get stats", data);
            setDummyDisplay(data);
            //if data is null then its empty...
          }}
        >
          Get Highlights
        </Button>
        <Button
          onClick={async () => {
            const data = await contractApi.createYourHighlight({
              name:'test101',
              description:"test101",
              icon:""
            });
            console.log("data from get stats", data);
          }}
        >
          Create Highlights
        </Button>
        <Button
          onClick={async () => {
            const data = await contractApi.getStats();
            console.log("data from get stats", data);
          }}
        >
          Add Message
        </Button>
        {dummyDisplay &&
          (typeof dummyDisplay === "string" ||
          typeof dummyDisplay === "number" ? (
            <p>{dummyDisplay}</p>
          ) : (
            <pre style={{ whiteSpace: "pre-wrap" }}>
              {JSON.stringify(dummyDisplay, null, 2)}
            </pre>
          ))}
        {/* <CarouselComp /> */}
        {/* {accounts?.length > 0 &&
          accounts.map((item) => {
            return <p key={item}>{item}</p>;
          })} */}
      </AppLayout>
    </div>
  );
};

export default React.memo(HighlightScreen);
