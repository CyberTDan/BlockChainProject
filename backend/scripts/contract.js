// NFT purchase
const Web3 = require("web3");
var fs = require('fs');

var debugLogsEnabled = false;

// Connecting to a local blockchain for testing purposes
const web3 = new Web3.Web3("http://localhost:8545");

// Contract ABI
var jsonFile = "scripts/TRC721NFT.json";
var parsed = JSON.parse(fs.readFileSync(jsonFile));
var abi = parsed.abi;

// Contract address on the blockchain
const address = "0x6576e89dd26fc2c3709fc0ec4f2ebe010c313457";

// Creating the contract object
const nftContract = new web3.eth.Contract(abi, address);

async function mintNFT(telegram_alias) {
    try {
        const accounts = await web3.eth.getAccounts();
        const fromAddress = accounts[0]; // Using the first account in the list

        const gas = await nftContract.methods.mintNFT(fromAddress, telegram_alias).estimateGas({ from: fromAddress });
        const response = await nftContract.methods.mintNFT(fromAddress, telegram_alias).send({ from: fromAddress, gas });

        console.log('Transaction successful:', response);

        if (debugLogsEnabled) {
            const balance = await nftContract.methods.balanceOf(fromAddress).call();

            if (balance === 0) {
                console.log('User does not own any NFTs');
                return;
            }

            // Checking all nfts owned by the current user
            for (let i = 0; i < balance; i++) {
                let tokenId = await nftContract.methods.tokenOfOwnerByIndex(fromAddress, i).call();
                console.log(`Token ID at index ${i}:`, tokenId);
            }
        }

        return true;
    } catch (error) {
        console.error('Error in transaction:', error);
        return false;
    }
}

module.exports = { mintNFT }


