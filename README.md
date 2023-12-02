# BlockChainProject

## Contract Deploy
1. Launch local Etherium network using Ganache

2. Navigate to "hardhat-project" folder and deploy contract:

```bash
npx hardhat run scripts/deploy.js --network ganache

```
<br>
If error occure check:

- Ganache access trough http://127.0.0.1:7545 in file hardhat.config.js
- Mnemonic: "runway hat fog kangaroo brown clerk fish guess elder obtain category wasp" - check in ganache settings