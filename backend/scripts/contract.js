// NFT purchase
const Web3 = require("web3");
var fs = require('fs');

const web3 = new Web3.Web3("http://localhost:8545");
var jsonFile = "scripts/TRC721NFT.json";
var parsed = JSON.parse(fs.readFileSync(jsonFile));
var abi = parsed.abi;

const address = "0x6576e89dd26fc2c3709fc0ec4f2ebe010c313457";
const nftContract = new web3.eth.Contract(abi, address);

async function mintNFT(telegram_alias) {
    try {
        const accounts = await web3.eth.getAccounts();
        const fromAddress = accounts[0]; // Using the first account in the list

        console.log('Account:', fromAddress);

        // // Replace "fromAddress" with the appropriate Ethereum address if necessary
        // const tx = await nftContract.methods.mintNFT(fromAddress, telegram_alias).send({ from: fromAddress });

        const gas = await nftContract.methods.mintNFT(fromAddress, telegram_alias).estimateGas({ from: fromAddress });

        console.log('Estimated gas:', gas);

        // Send the transaction
        const response = await nftContract.methods.mintNFT(fromAddress, telegram_alias).send({ from: fromAddress, gas });

        console.log('Transaction successful:', response);

        const balance = await nftContract.methods.balanceOf(fromAddress).call();

        if (balance === 0) {
            console.log('User does not own any NFTs');
            return;
        }

        // Retrieve the first NFT's token ID owned by the user
        const tokenId = await nftContract.methods.tokenOfOwnerByIndex(fromAddress, 0).call();
        console.log('Token ID:', tokenId);

        // If you need to retrieve all token IDs, loop through the balance
        for (let i = 0; i < balance; i++) {
            let tokenId = await nftContract.methods.tokenOfOwnerByIndex(fromAddress, i).call();
            console.log(`Token ID at index ${i}:`, tokenId);
        }


    } catch (error) {
        console.error('Error in transaction:', error);
    }
}

module.exports = { mintNFT }


