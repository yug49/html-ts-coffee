export const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export const abi = [
    {
        type: "constructor",
        inputs: [
            {
                name: "priceFeed",
                type: "address",
                internalType: "address",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "fallback",
        stateMutability: "payable",
    },
    {
        type: "receive",
        stateMutability: "payable",
    },
    {
        type: "function",
        name: "MINIMUM_USD",
        inputs: [],
        outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "fund",
        inputs: [],
        outputs: [],
        stateMutability: "payable",
    },
    {
        type: "function",
        name: "getAddressToAmountFunded",
        inputs: [
            {
                name: "fundingAddress",
                type: "address",
                internalType: "address",
            },
        ],
        outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "getFunder",
        inputs: [
            {
                name: "index",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [{ name: "", type: "address", internalType: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "getOwner",
        inputs: [],
        outputs: [{ name: "", type: "address", internalType: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "getPriceFeed",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "address",
                internalType: "contract AggregatorV3Interface",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "getVersion",
        inputs: [],
        outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "withdraw",
        inputs: [],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "error",
        name: "NotOwner",
        inputs: [],
    },
];
