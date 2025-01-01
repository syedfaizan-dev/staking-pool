import { sepolia } from "viem/chains";

export const poolConfig: {
    address: `0x${string}`;
    abi: any;
    chainId: number;
  } = {
    address: "0x471646742FF86565224706303c47b1B7DD7eA165",
    abi: [{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"fixedPool","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"flexiblePool","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getRankInFlexible","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRewardFixed","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getRewardFlexible","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isRewardFixed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isRewardFlexible","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"stakeFixed","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"stakeFlexible","outputs":[],"stateMutability":"nonpayable","type":"function"}],
    chainId: sepolia.id,
};
