import {
    createWalletClient,
    custom,
    createPublicClient,
    parseEther,
    defineChain,
    formatEther,
    WalletClient,
    PublicClient,
    Chain,
    Address
} from "viem";

import "viem/window";

import { contractAddress, abi } from "./constants-ts.ts";

// Define HTML element types
const connectButton = document.getElementById("ConnectButton") as HTMLButtonElement;
const fundButton = document.getElementById("BuyCoffeeButton") as HTMLButtonElement;
const ethAmountInput = document.getElementById("ethAmount") as HTMLInputElement;
const balanceButton = document.getElementById("BalanceButton") as HTMLButtonElement;
const withdrawButton = document.getElementById("WithdrawButton") as HTMLButtonElement;

// Initialize clients with types
let walletClient: WalletClient;
let publicClient: PublicClient;

async function connect(): Promise<Address | undefined> {
    console.log("Connecting...");
    if (typeof window.ethereum !== "undefined") {
        console.log("MetaMask is installed");
        walletClient = createWalletClient({
            transport: custom(window.ethereum),
        });
        console.log("Wallet client created", walletClient);
        const addresses = await walletClient.requestAddresses();

        if (addresses && addresses.length > 0) {
            console.log("Connected with address:", addresses[0]);
            connectButton.innerHTML = "Connected";
            return addresses[0]; // Return the first address for further use
        } else {
            console.error("No addresses returned");
            connectButton.innerHTML = "Connection failed";
        }
    } else {
        connectButton.innerHTML = "Please install MetaMask";
    }
}

async function fund(): Promise<void> {
    const ethAmount = ethAmountInput.value;
    console.log(`funding with ${ethAmount} ETH`);

    if (typeof window.ethereum !== "undefined") {
        walletClient = createWalletClient({
            transport: custom(window.ethereum),
        });
        const [connectedAccount] = await walletClient.requestAddresses();
        const currentChain = await getCurrentChain(walletClient);

        publicClient = createPublicClient({
            transport: custom(window.ethereum),
        });
        const { request } = await publicClient.simulateContract({
            address: contractAddress,
            abi: abi,
            functionName: "fund",
            account: connectedAccount,
            chain: currentChain,
            value: parseEther(ethAmount),
        });
        console.log("Transaction simulated successfully");
        const hash = await walletClient.writeContract(request);
        console.log("Transaction hash:", hash);
    } else {
        connectButton.innerHTML = "Please install MetaMask";
    }
}

async function withdraw(): Promise<void> {
    console.log("Withdrawing...");

    if (typeof window.ethereum !== "undefined") {
        walletClient = createWalletClient({
            transport: custom(window.ethereum),
        });
        const [connectedAccount] = await walletClient.requestAddresses();
        const currentChain = await getCurrentChain(walletClient);

        publicClient = createPublicClient({
            transport: custom(window.ethereum),
        });
        const { request } = await publicClient.simulateContract({
            address: contractAddress,
            abi: abi,
            functionName: "withdraw",
            account: connectedAccount,
            chain: currentChain,
            // No value needed for withdraw
        });
        console.log("Withdraw transaction simulated successfully");
        const hash = await walletClient.writeContract(request);
        console.log("Withdraw transaction hash:", hash);
    } else {
        connectButton.innerHTML = "Please install MetaMask";
    }
}

async function getCurrentChain(client: WalletClient): Promise<Chain> {
    const chainId = await client.getChainId();
    const currentChain = defineChain({
        id: chainId,
        name: "Custom Chain",
        nativeCurrency: {
            name: "Ether",
            symbol: "ETH",
            decimals: 18,
        },
        rpcUrls: {
            default: {
                http: ["http://localhost:8545"],
            },
        },
    });
    return currentChain;
}

async function getBalance(): Promise<void> {
    if (typeof window.ethereum !== "undefined") {
        walletClient = createWalletClient({
            transport: custom(window.ethereum),
        });

        publicClient = createPublicClient({
            transport: custom(window.ethereum),
        });
        const balance = await publicClient.getBalance({
            address: contractAddress,
        });
        console.log("Balance:", formatEther(balance));
    } else {
        connectButton.innerHTML = "Please install MetaMask";
    }
}

// Add event listeners with proper typing
connectButton.onclick = connect;
fundButton.onclick = fund;
balanceButton.onclick = getBalance;
withdrawButton.onclick = withdraw;