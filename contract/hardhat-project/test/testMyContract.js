const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TRC721NFT Contract", function () {
    let TRC721NFT;
    let trc721nft;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        TRC721NFT = await ethers.getContractFactory("TRC721NFT");
        [owner, addr1, addr2] = await ethers.getSigners();
        trc721nft = await TRC721NFT.deploy("TestToken", "TT");
    });

    describe("Minting", function () {
        it("Should mint a new token and assign it to owner", async function () {
            await trc721nft.mintNFT(addr1.address, "Addr1Alias");
            expect(await trc721nft.balanceOf(addr1.address)).to.equal(1);
        });
    });

    describe("Verify Owner with Alias", function () {
        it("Should return true for the correct owner and alias", async function () {
            await trc721nft.mintNFT(addr1.address, "Addr1Alias");
            expect(await trc721nft.verifyOwnership("Addr1Alias")).to.be.true;
        });
    });

    describe("Update Telegram Alias", function () {
        it("Should update the alias for the token owner", async function () {
            await trc721nft.mintNFT(addr1.address, "Addr1Alias");
            await trc721nft.connect(addr1).updateTelegramAlias(addr1.address, "NewAlias");
            expect(await trc721nft.verifyOwnership("NewAlias")).to.be.true;
        });
    });

});

