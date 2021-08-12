import { ethers } from "ethers";


const provider = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_INFURA_MAINNET,
  1
);


export { provider };