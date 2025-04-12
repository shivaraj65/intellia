"use client";

import React, { ReactNode, useCallback, useEffect } from "react";
import { createClientUPProvider } from "@lukso/up-provider";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setAccounts,
  setContextAccounts,
  setProfileConnected,
} from "@/redux/reducers/upProvideSlice";

const provider = createClientUPProvider();

interface PropTypes{
  children: ReactNode
}

const UpProvider = ({children}:PropTypes) => {
  const dispatch = useDispatch<AppDispatch>();

  const { accounts, contextAccounts, profileConnected } = useSelector(
    (state: RootState) => state.upProvider
  );

  // Helper to check connection status
  const updateConnected = useCallback(
    (
      _accounts: Array<`0x${string}`>,
      _contextAccounts: Array<`0x${string}`>
    ) => {
      dispatch(
        setProfileConnected(_accounts.length > 0 && _contextAccounts.length > 0)
      );
      console.log(profileConnected);
    },
    []
  );

  useEffect(() => {
    async function init() {
      try {
        const _accounts = provider.accounts as Array<`0x${string}`>;
        dispatch(setAccounts(_accounts));

        const _contextAccounts = provider.contextAccounts;
        updateConnected(_accounts, _contextAccounts);
      } catch (error) {
        console.error("Failed to initialize provider:", error);
      }
    }

    // Handle account changes
    const accountsChanged = (_accounts: Array<`0x${string}`>) => {
      dispatch(setAccounts(_accounts));
      updateConnected(_accounts, contextAccounts);
    };

    const contextAccountsChanged = (_accounts: Array<`0x${string}`>) => {
      dispatch(setContextAccounts(_accounts));
      updateConnected(accounts, _accounts);
    };

    init();

    // Set up event listeners
    provider.on("accountsChanged", accountsChanged);
    provider.on("contextAccountsChanged", contextAccountsChanged);

    // Cleanup listeners
    return () => {
      provider.removeListener("accountsChanged", accountsChanged);
      provider.removeListener("contextAccountsChanged", contextAccountsChanged);
    };
  }, [accounts[0], contextAccounts[0], updateConnected]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default React.memo(UpProvider);
