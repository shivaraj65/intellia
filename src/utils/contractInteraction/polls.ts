"use client";

// lib/viemClient.ts
import { createClientUPProvider } from "@lukso/up-provider";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { luksoTestnet } from "viem/chains";
import { contractAddress, contractABI } from "../abi/polls";

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
  createPoll: async () => {
    try {
      const { publicClient } = await contractApi.setupClients();
    } catch (error: any) {
      console.log(error);
      return "Something went wrong";
    }
  },
  vote: async () => {
    try {
      const { publicClient } = await contractApi.setupClients();
    } catch (error: any) {
      console.log(error);
      return "Something went wrong";
    }
  },
  getPollDataByUser: async () => {
    //fetches only the id of polls
    try {
      const { publicClient } = await contractApi.setupClients();
      const result: any = await publicClient.readContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "getPollsByUser",
      });
      if (result) {
        //arraay of unique id's - uuid
        return {
          data: result as string[],
        };
      }
    } catch (error: any) {
      console.log(error);
      return "Something went wrong";
    }
  },
  getPollData: async () => {
    //fetches individual poll
    try {
      const { publicClient } = await contractApi.setupClients();
      const result: any = await publicClient.readContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "getPoll",
      });
      if (result && Array.isArray(result)) {
        const [a, b, c, d, e] = result as [
          string,
          string,
          string[],
          number[],
          string
        ];
        return {
          name: a,
          description: b,
          options: c,
          votes: d,
          creator: e,
        };
      }
    } catch (error: any) {
      console.log(error);
      return "Something went wrong";
    }
  },
  getUsersVoteStatus: async () => {
    try {
      const { publicClient } = await contractApi.setupClients();
      const result: any = await publicClient.readContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "getUserVote",
      });
      if (result && Array.isArray(result)) {
        const [x, y] = result as [boolean, number];
        return {
          isvoted: x,
          option: y,
        };
      }
    } catch (error: any) {
      console.log(error);
      return "Something went wrong";
    }
  },
  getTotalVotes: async () => {
    //get total votes fro a specific poll
    try {
      const { publicClient } = await contractApi.setupClients();
      const result: any = await publicClient.readContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "getTotalVotes",
      });
      if (result) {
        return result as number;
      }
    } catch (error: any) {
      console.log(error);
      return "Something went wrong";
    }
  },
  getStats: async () => {
    try {
      const { publicClient } = await contractApi.setupClients();
      const result: any = await publicClient.readContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "getTotalPolls",
      });
      if (result) {
        return {
          totalPollsCreated: result as number,
        };
      }
    } catch (error: any) {
      console.log("error", error);
      return "Something went wrong while fetching the stats";
    }
    return null;
  },
  getTransactionStatus: async (txnHash: any) => {
    try {
      const { publicClient } = await contractApi.setupClients();

      const result = await publicClient.waitForTransactionReceipt({
        hash: txnHash,
        pollingInterval: 2000,
        timeout: 60000,
      });

      return result;
    } catch (error: any) {
      console.log(error);
      return "Something went wrong";
    }
  },
};


//need to do input configs for all the functions..
//args for functions