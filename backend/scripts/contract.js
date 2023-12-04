// NFT purchase
const Web3 = require("web3");
var fs = require('fs');

const web3 = new Web3.Web3("http://localhost:8545");
var jsonFile = "scripts/contract.json";
var parsed = JSON.parse(fs.readFileSync(jsonFile));
var abi = parsed.abi;

const address = "0x6576e89dd26fc2c3709fc0ec4f2ebe010c313457";
const nftContract = new web3.eth.Contract(abi, address);

async function mintNFT(telegram_alias) {
    try {
        const accounts = await web3.eth.getAccounts();

        console.log("tg alias: " + telegram_alias + "\naddress: " + accounts[0]);

        const tx = await nftContract.methods
            .mintNFT(accounts[0], telegram_alias)
            .send({ from: accounts[0] });

        console.log('success');
        return 'Transaction:' + tx;
    } catch (error) {
        console.log('error\n' + error);
        return 'Error:' + error;
    }
}

module.exports = { mintNFT }
