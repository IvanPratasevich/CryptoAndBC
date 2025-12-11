// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GameCharacterERC1155 is ERC1155, Ownable, ERC1155URIStorage {
    uint256 public constant TOTAL_CHARACTERS = 10;

    constructor() ERC1155("") Ownable(msg.sender) {
        _mint(msg.sender, 1, 1, "");
        ERC1155URIStorage._setURI(1, "ipfs://baaaa1");
        _mint(msg.sender, 2, 1, "");
        ERC1155URIStorage._setURI(2, "ipfs://2");
        _mint(msg.sender, 3, 1, "");
        ERC1155URIStorage._setURI(3, "ipfs://3");
        _mint(msg.sender, 4, 1, "");
        ERC1155URIStorage._setURI(4, "ipfs://4");
        _mint(msg.sender, 5, 1, "");
        ERC1155URIStorage._setURI(5, "ipfs://5");
        _mint(msg.sender, 6, 1, "");
        ERC1155URIStorage._setURI(6, "ipfs://6");
        _mint(msg.sender, 7, 1, "");
        ERC1155URIStorage._setURI(7, "ipfs://7");
        _mint(msg.sender, 8, 1, "");
        ERC1155URIStorage._setURI(8, "ipfs://8");
        _mint(msg.sender, 9, 1, "");
        ERC1155URIStorage._setURI(9, "ipfs://9");
        _mint(msg.sender, 10, 1, "");
        ERC1155URIStorage._setURI(10, "ipfs://bafybeistormrider10");
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        for (uint256 i = 0; i < ids.length; i++) {
            require(
                ids[i] >= 1 && ids[i] <= TOTAL_CHARACTERS,
                "Invalid token ID"
            );
        }

        _mintBatch(to, ids, amounts, data);
    }


    function uri(
        uint256 tokenId
    ) public view override(ERC1155, ERC1155URIStorage) returns (string memory) {
        require(tokenId <= TOTAL_CHARACTERS, "Token does not exist");
        return ERC1155URIStorage.uri(tokenId);
    }
}
