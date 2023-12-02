// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const TRC721NFT = await hre.ethers.getContractFactory("TRC721NFT");
  const trc721nft = await TRC721NFT.deploy("MyToken", "MTK");

  console.log("Waiting for TRC721NFT deployment...");

  // The contract is already deployed when the Promise resolves
  console.log("TRC721NFT deployed to:", trc721nft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });
