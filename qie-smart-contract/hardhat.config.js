import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
export default {
  solidity: "0.8.24",
  networks: {
    qie_mainnet: {
      url:
        process.env.QIE_MAINNET_RPC || "https://rpc-main1.qiblockchain.online",
      chainId: 5656,
      accounts: process.env.PRIVATE_KEY ? [`0x${process.env.PRIVATE_KEY}`] : [],
      timeout: 60000,
      gasPrice: 20000000000, // 20 gwei
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
  },
};
