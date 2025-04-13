"use client";

// lib/viemClient.ts
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { luksoTestnet } from "viem/chains";
import { contractAddress, contractABI } from "../abi/highlights";

const luksoTestnetChainId = "0x1069";

interface createProps {
  name: string;
  description: string;
  icon: string;
}

export const contractApi = {
  setupClients: async () => {
    const provider = (window as any).ethereum;
    if (!provider) {
      throw new Error("Wallet not found");
    }

    const publicClient = createPublicClient({
      chain: luksoTestnet,
      transport: http("https://rpc.testnet.lukso.network"),
      //wss://ws-rpc.testnet.lukso.network
    });
    console.log("public client", publicClient);
    const walletClient = createWalletClient({
      chain: luksoTestnet,
      transport: custom(provider),
    });
    console.log("wallet client", walletClient);
    return { publicClient, walletClient };
  },
  connectToLuksoTestnet: async () => {
    try {
      const currentChainId = await (window as any).ethereum.request({
        method: "eth_chainId",
      });

      if (currentChainId !== luksoTestnetChainId) {
        try {
          await (window as any).ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: luksoTestnetChainId }],
          });
        } catch (err: any) {
          if (err.code === 4902) {
            // Chain not added to wallet, try adding it
            await (window as any).ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: luksoTestnetChainId,
                  chainName: "LUKSO Testnet",
                  nativeCurrency: {
                    name: "LYXt",
                    symbol: "LYXt",
                    decimals: 18,
                  },
                  rpcUrls: ["https://rpc.testnet.lukso.network"],
                  blockExplorerUrls: [
                    "https://explorer.execution.testnet.lukso.network",
                  ],
                },
              ],
            });
          } else {
            console.error("Chain switch failed:", err);
            return false;
          }
        }
      }

      return true;
    } catch (err) {
      console.error("Failed to connect to LUKSO Testnet:", err);
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
  addMessageForHighlight: async () => {
    try {
    } catch (error: any) {
        console.log('error',error);
    }
  },
  createYourHighlight: async ({ name, description, icon }: createProps) => {
    try {
      const { publicClient, walletClient } = await contractApi.setupClients();

      const connected = await contractApi.connectToLuksoTestnet();

      if (!connected) {
        alert("Please connect to LUKSO Testnet to continue.");
        return;
      }
      const [account] = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("accounts---", account);
      const testResults: any = await publicClient.simulateContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "createHighlight",
        account,
        args: [name, description, icon],
      });
      console.log("testResults-----", testResults);
      const result = await walletClient.writeContract(testResults);
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
        console.log('error',error);
      return "Something went wrong while reading the highlight.";
    }
    return null;
  },
};

// Simulate a flow
// contractApi.getHighlightsforUser("0xabc...");
// contractApi.getStats();
// contractApi.createYourHighlight("Name", "Desc", "🔥", "0xabc...", ["0x123...", "0x456..."]);
// contractApi.addMessageForHighlight("0xdef...", "Hey there!", "0xabc...");
