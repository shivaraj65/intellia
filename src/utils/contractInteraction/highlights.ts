"use client";

// lib/viemClient.ts
import { createClientUPProvider } from "@lukso/up-provider";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { luksoTestnet } from "viem/chains";
import { contractAddress, contractABI } from "../abi/highlights";

// const luksoTestnetChainId = "0x1069";

interface createProps {
  name: string;
  description: string;
  icon: string;
  accounts: any[];
}

interface addMessageProps {
  highlightAddress: string;
  messageText: string;
  icon: string;
  accounts: any[];
}

export const contractApi = {
  requestConnection: async () => {
    const provider = (window as any).lukso as any | undefined;

    if (!provider) {
      alert("Please install the LUKSO Universal Profile browser extension.");
      return null;
    }

    try {
      const accounts: string[] = await provider.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected UP accounts:", accounts);
      return accounts;
    } catch (error) {
      console.error("Error connecting to LUKSO UP Wallet:", error);
      return null;
    }
  },
  setupClients: async () => {
    // const provider = (window as any).lukso as any;

    // Construct the up-provider
    const provider = createClientUPProvider();

    if (!provider) {
      alert("Please install the LUKSO Universal Profile browser extension.");
    }

    // Check if we are using the UP provider
    // if (!provider.isUniversalProfileExtension) {
    //   console.error("Not using a Universal Profile provider.");
    // }

    const publicClient = createPublicClient({
      chain: luksoTestnet,
      transport: http("https://rpc.testnet.lukso.network"),
      //wss://ws-rpc.testnet.lukso.network
    });

    const walletClient = createWalletClient({
      chain: luksoTestnet,
      transport: custom(provider),
    });

    return { publicClient, walletClient };
  },
  isWalletConnected: async () => {
    try {
      const provider = (window as any).lukso as any | undefined;

      if (!provider) {
        alert("Please install the LUKSO Universal Profile browser extension.");
        return false;
      }

      const accounts = await provider.request({ method: "eth_accounts" });
      return accounts;
    } catch (error) {
      console.error("Error checking wallet connection:", error);
      return false;
    }
  },
  getHighlightsforUser: async (address: string) => {
    const { publicClient } = await contractApi.setupClients();
    try {
      const result: any[] | unknown = await publicClient.readContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "viewHighlight",
        args: [address],
      });
      console.log("results", result);
      if (result && Array.isArray(result)) {
        const [x, y, z, a] = result as [string, string, string, any[]];
        return {
          name: x,
          description: y,
          icon: z,
          messages: a,
        };
      }
      return result;
    } catch (error: any) {
      console.log("Contract call failed:", error.message);
      console.log("Contract 123 failed:", error.shortMessage);
      console.log("details -----", error.details);
      if (error.shortMessage?.includes("Highlight does not exist")) {
        return null;
      } else if (
        error.shortMessage?.includes("Can't message your own highlight")
      ) {
        return "Can't message your own highlight";
      } else {
        return "Something went wrong while reading the highlight.";
      }
    }
  },
  addMessageForHighlight: async ({
    highlightAddress,
    messageText,
    icon,
    accounts,
  }: addMessageProps) => {
    try {
      const { publicClient, walletClient } = await contractApi.setupClients();

      // const accounts = await contractApi.isWalletConnected();

      // if (!accounts) {
      //   alert("Please connect to LUKSO Testnet to continue.");
      //   return;
      // }
      // if (accounts.length === 0) {
      //   alert("No user profiles found.");
      //   return;
      // }      
      const testResults: any = await publicClient.simulateContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "writeMessage",
        account: accounts[0],
        args: [highlightAddress, messageText, icon],
      });
      console.log("testResults-----", testResults);
      const result = await walletClient.writeContract({
        ...testResults.request,
        account: accounts[0],
      });
      return result;
    } catch (error: any) {
      console.log(error);
      return "Something went wrong while trying to create highlights.";
    }
  },
  createYourHighlight: async ({
    name,
    description,
    icon,
    accounts,
  }: createProps) => {
    try {
      const { publicClient, walletClient } = await contractApi.setupClients();

      // const accounts = await contractApi.isWalletConnected();

      // if (!accounts) {
      //   alert("Please connect to LUKSO Testnet to continue.");
      //   return;
      // }
      // if (accounts.length === 0) {
      //   alert("No user profiles found.");
      //   return;
      // }
      // console.log("accounts---", accounts);

      const testResults: any = await publicClient.simulateContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "createHighlight",
        account: accounts[0],
        args: [name, description, icon],
      });
      console.log("testResults-----", testResults);
      const result = await walletClient.writeContract({
        ...testResults.request,
        account: accounts[0],
      });
      console.log("test result", result);
      return result;
    } catch (error: any) {
      console.log(error);
      return "Something went wrong while trying to create highlights.";
    }
  },
  getStats: async () => {
    try {
      const { publicClient } = await contractApi.setupClients();
      const result: any[] | unknown = await publicClient.readContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "getStats",
      });
      if (result && Array.isArray(result)) {
        const [x, y] = result?.map(Number);
        return {
          totalMessages: x,
          totalUsers: y,
        };
      }
    } catch (error: any) {
      console.log("error", error);
      return "Something went wrong while reading the highlight.";
    }
    return null;
  },
  getTransactionStatus: async (txnHash: any) => {
    try {
      const { publicClient } = await contractApi.setupClients();

      const result = await publicClient.waitForTransactionReceipt({
        hash: txnHash,
        pollingInterval: 2000,
        timeout: 60000, // in ms
      });

      return result;
    } catch (error: any) {
      console.log(error);
      return "Something went wrong while trying to create highlights.";
    }
  },
};
