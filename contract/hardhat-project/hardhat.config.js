require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    ganache: {
      url: "http://ganache:8545", // Default URL for Ganache
      accounts: { mnemonic: "shoot zoo ozone illegal picnic burger level purse excite around body mimic" } // Use the Ganache mnemonic
      // You can also specify specific accounts using their private keys
      // accounts: ["0x...", "0x...", ...]
    },
    // other network configurations...
  },
  solidity: "0.8.20",
};
