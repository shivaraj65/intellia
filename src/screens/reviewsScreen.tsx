import AppLayout from "@/layout/appLayout";
import { RootState } from "@/redux/store";
import { App, Divider } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "@/styles/screens/reviews.module.scss";

const ReviewScreen = () => {
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
  const [pollData, setPollData] = useState<any>(null);

  const [txnHash, setTxnHash] = useState<any>(null);

  const blockchainFunctions = {};

  const DrawerContents = (): React.ReactNode => {
    return (
      <div className={styles.drawerContent}>
        <div className={styles.subAppInfo}>
          <h3 className={styles.accentText + " title"}>Reviews</h3>
          <p className={styles.description + " font2"}>Read. Reflect. Decide.</p>
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
  return (
    <div className={styles.reviewComponent}>
      {" "}
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
        <> ReviewScreen</>
      </AppLayout>
    </div>
  );
};

export default React.memo(ReviewScreen);
