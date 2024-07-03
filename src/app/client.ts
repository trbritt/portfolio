import { createThirdwebClient, getContract } from "thirdweb";
import {defineChain} from "thirdweb/chains";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = "15afb7be69757b1ad7718b044cef539e";

if (!clientId) {
  throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
});

export const chain = defineChain(80002);

export const contract = getContract({
  client: client,
  chain: chain,
  address: "0x2c1C93A09FF9D91d5c8522aC6f7b142B91a41C92",
  abi: [
    {
      "type": "constructor",
      "name": "",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "count",
      "inputs": [],
      "outputs": [
        {
          "type": "uint256",
          "name": "",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "decrement",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "getCount",
      "inputs": [],
      "outputs": [
        {
          "type": "uint256",
          "name": "",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "increment",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    }
  ]
});