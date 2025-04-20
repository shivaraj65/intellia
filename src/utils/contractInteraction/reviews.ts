"use client";

// lib/viemClient.ts
import { createClientUPProvider } from "@lukso/up-provider";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { luksoTestnet } from "viem/chains";
import { contractAddress, contractABI } from "../abi/reviews";

interface createProps {
  topicId: string;
  title: string;
  description: string;
  imageURL: string;
  externalLink: string;
  accounts: `0x${string}`[];
}

interface leaveReviewProps {
  topicId: string;
  message: string;
  rating: number;
  timestamp: string;
  accounts: `0x${string}`[];
}

interface didIReviewProps {
  topicId: string;
  accounts: `0x${string}`[];
}

export const reviewsContractApi = {
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
  create: async ({
    topicId,
    title,
    description,
    imageURL,
    externalLink,
    accounts,
  }: createProps) => {
    try {
      const { publicClient, walletClient } =
        await reviewsContractApi.setupClients();
      const testResults: any = await publicClient.simulateContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "createPoll",
        account: accounts[0],
        args: [topicId, title, description, imageURL, externalLink],
      });
      console.log("testResults-----", testResults);
      const result = await walletClient.writeContract({
        ...testResults.request,
        account: accounts[0],
      });
      return result;
    } catch (error: any) {
      console.log(error);
      return "Something went wrong";
    }
  },
  leaveReview: async ({
    topicId,
    message,
    rating,
    timestamp,
    accounts,
  }: leaveReviewProps) => {
    try {
      const { publicClient, walletClient } =
        await reviewsContractApi.setupClients();
      const testResults: any = await publicClient.simulateContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "leaveReview",
        account: accounts[0],
        args: [topicId, message, rating, timestamp],
      });
      console.log("testResults-----", testResults);
      const result = await walletClient.writeContract({
        ...testResults.request,
        account: accounts[0],
      });
      return result;
    } catch (error: any) {
      console.log(error);
      return "Something went wrong";
    }
  },
  didIReview: async ({ topicId, accounts }: didIReviewProps) => {
    try {
      const { publicClient } = await reviewsContractApi.setupClients();
      const result: any = await publicClient.readContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "hasReviewed",
        args: [topicId, accounts[0]],
      });
      if (typeof result === "boolean") {
        return {
          isReviewed: result,
        };
      }
      return "Something went wrong";
    } catch (error: any) {
      console.log(error);
      return "Something went wrong";
    }
  },
  getHisReviewIds: async (profileAccount: `0x${string}`) => {
    try {
      const { publicClient } = await reviewsContractApi.setupClients();
      const result: any = await publicClient.readContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "getMyTopicIds",
        args: [profileAccount],
      });
      if (result && Array.isArray(result)) {
        return result;
      }
    } catch (error: any) {
      console.log(error);
      return "Something went wrong";
    }
  },
  getHisReviewMetadata: async (topicId: string) => {
    try {
      const { publicClient } = await reviewsContractApi.setupClients();
      const result: any = await publicClient.readContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "getTopicDetails",
        args: [topicId],
      });
      if (result && Array.isArray(result)) {
        const [a, b, c, d, e, f, g] = result as [
          string,
          string,
          string,
          string,
          string,
          boolean,
          number
        ];
        return {
          id: a,
          name: b,
          description: c,
          imageURL: d,
          externalLink: e,
          isDeleted: f,
          reviewCount: g,
        };
      }
    } catch (error: any) {
      console.log(error);
      return "Something went wrong";
    }
  },
  getReviewsByIdx: async (topicId: string, index: number) => {
    try {
      const { publicClient } = await reviewsContractApi.setupClients();
      const result: any = await publicClient.readContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "getTopicReview",
        args: [topicId, index],
      });
      if (result && Array.isArray(result)) {
        const [a, b, c, d] = result as [string, string, number, string];
        return {
          reviewer: a,
          message: b,
          rating: c,
          timestamp: d,
        };
      }
    } catch (error: any) {
      console.log(error);
      return "Something went wrong";
    }
  },
  getStats: async () => {
    try {
      const { publicClient } = await reviewsContractApi.setupClients();
      const result: any = await publicClient.readContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "getAppMetrics",
      });
      if (result && Array.isArray(result)) {
        const [x, y, z] = result as [number, number, number];
        return {
          totalCreatedTopics: x,
          totalRegisteredUsers: y,
          totalSubmittedReviews: z,
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
      const { publicClient } = await reviewsContractApi.setupClients();

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
 