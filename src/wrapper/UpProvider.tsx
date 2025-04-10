import React, { useCallback, useEffect, useState } from "react";
import { createClientUPProvider } from "@lukso/up-provider";

const provider = createClientUPProvider();

const UpProvider = () => {
  // Track connected accounts
  const [accounts, setAccounts] = useState<Array<`0x${string}`>>([]);
  const [contextAccounts, setContextAccounts] = useState<Array<`0x${string}`>>(
    []
  );
  const [profileConnected, setProfileConnected] = useState(false);

  // Helper to check connection status
  const updateConnected = useCallback(
    (
      _accounts: Array<`0x${string}`>,
      _contextAccounts: Array<`0x${string}`>
    ) => {
      setProfileConnected(_accounts.length > 0 && _contextAccounts.length > 0);
    },
    []
  );

  useEffect(() => {
    async function init() {
      try {
        const _accounts = provider.accounts as Array<`0x${string}`>;
        setAccounts(_accounts);

        const _contextAccounts = provider.contextAccounts;
        updateConnected(_accounts, _contextAccounts);
      } catch (error) {
        console.error("Failed to initialize provider:", error);
      }
    }

    // Handle account changes
    const accountsChanged = (_accounts: Array<`0x${string}`>) => {
      setAccounts(_accounts);
      updateConnected(_accounts, contextAccounts);
    };

    const contextAccountsChanged = (_accounts: Array<`0x${string}`>) => {
      setContextAccounts(_accounts);
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

  return <div>
    up provider wrapper
  </div>;
};

export default React.memo(UpProvider);
