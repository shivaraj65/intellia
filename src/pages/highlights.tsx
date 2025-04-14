"use client";

import React from "react";
import HighlightScreen from "@/screens/highlightsScreen";
import styles from "@/styles/pages/highlights.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SafeScreen from "@/components/common/safeScreen/safeScreen";

const Highlights = () => {
  const accounts = useSelector((state: RootState) => state.upProvider.accounts);
  const contextAccounts = useSelector(
    (state: RootState) => state.upProvider.contextAccounts
  );

  return (
    <div className={styles.highlightsApp}>
      {accounts &&
      accounts.length > 0 &&
      contextAccounts &&
      contextAccounts.length > 0 ? (
        <HighlightScreen />
      ) : (
        <SafeScreen
          message={"Hang tight while we establish a secure wallet connection."}
          title={"Setting Things Up"}
        />        
      )}
    </div>
  );
};

export default React.memo(Highlights);
