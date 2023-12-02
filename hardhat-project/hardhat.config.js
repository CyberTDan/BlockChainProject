require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545", // Default URL for Ganache
      accounts: { mnemonic: "runway hat fog kangaroo brown clerk fish guess elder obtain category wasp" } // Use the Ganache mnemonic
      // You can also specify specific accounts using their private keys
      // accounts: ["0x...", "0x...", ...]
    },
    // other network configurations...
  },
  solidity: "0.8.20",
};
