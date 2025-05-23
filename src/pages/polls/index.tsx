import PollsScreen from "@/screens/pollsScreen";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SafeScreen from "@/components/common/safeScreen/safeScreen";
import styles from "@/styles/pages/polls.module.scss";

const Polls = () => {
  const accounts = useSelector((state: RootState) => state.upProvider.accounts);
  const contextAccounts = useSelector(
    (state: RootState) => state.upProvider.contextAccounts
  );
  return (
    <div className={styles.pollsApp}>      
      {accounts &&
      accounts.length > 0 &&
      contextAccounts &&
      contextAccounts.length > 0 ? (
        <PollsScreen />
      ) : (
        <SafeScreen
          message={"Hang tight while we establish a secure wallet connection."}
          title={"Setting Things Up"}
        />
      )}
    </div>
  );
};

export default React.memo(Polls);
