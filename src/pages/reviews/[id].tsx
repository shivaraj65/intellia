import React from "react";
import ReviewScreen from "@/screens/reviewsScreen";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SafeScreen from "@/components/common/safeScreen/safeScreen";

const Reviews = () => {
  const accounts = useSelector((state: RootState) => state.upProvider.accounts);
  const contextAccounts = useSelector(
    (state: RootState) => state.upProvider.contextAccounts
  );

  return (
    <div>
      {accounts &&
      accounts.length > 0 &&
      contextAccounts &&
      contextAccounts.length > 0 ? (
        <ReviewScreen />
      ) : (
        <SafeScreen
          message={"Hang tight while we establish a secure wallet connection."}
          title={"Setting Things Up"}
        />
      )}
    </div>
  );
};

export default React.memo(Reviews);