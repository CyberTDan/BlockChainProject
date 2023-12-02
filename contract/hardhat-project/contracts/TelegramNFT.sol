// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract TRC721NFT is ERC721Enumerable {
    // Mapping from token ID to Telegram alias
    mapping(uint256 => string) private _tokenToAlias;
    mapping(string => uint256) private _aliasToToken;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function mintNFT(address recipient, string memory telegramAlias) public {
        require(bytes(telegramAlias).length > 0, "Telegram alias cannot be empty");

        uint256 newTokenId = _getNextTokenId();
        _safeMint(recipient, newTokenId);
        _setTokenTelegramAlias(newTokenId, telegramAlias);
    }

    function verifyOwnership(string memory telegramAlias) public view returns (bool) {
        return _aliasToToken[telegramAlias] > 0;
    }

    function _getTokenIdByOwner(address owner) private view returns (bool, uint256) {
        uint256 balance = balanceOf(owner);
        for(uint256 i = 0; i < balance; i++){
            uint256 tokenId = tokenOfOwnerByIndex(owner, i);
            if (bytes(_tokenToAlias[tokenId]).length > 0) {
                return (true, tokenId);
            }
        }
        return (false, 0);
    }

    function _setTokenTelegramAlias(uint256 tokenId, string memory telegramAlias) private {
        _tokenToAlias[tokenId] = telegramAlias;
        _aliasToToken[telegramAlias] = tokenId;
    }

    function updateTelegramAlias(address owner, string memory newTelegramAlias) public {
        require(bytes(newTelegramAlias).length > 0, "New Telegram alias cannot be empty");

        (bool found, uint256 tokenId) = _getTokenIdByOwner(owner);
        require(found, "Owner does not own any NFTs");

        require(ownerOf(tokenId) == msg.sender, "Only NFT owner can update alias");

        _setTokenTelegramAlias(tokenId, newTelegramAlias);
    }


    function _getNextTokenId() private view returns (uint256) {
        return totalSupply() + 1;
    }
}
