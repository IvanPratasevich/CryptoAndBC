// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GameCharacterERC1155 is ERC1155, Ownable, ERC1155URIStorage {
    uint256 public constant TOTAL_CHARACTERS = 10;

    constructor() ERC1155("") Ownable(msg.sender) {
        _mint(msg.sender, 1, 1, "");
        ERC1155URIStorage._setURI(1, "ipfs://bafkreiahcxyuxetm3qirthefpeh523ccb7t6besfvnvkypkoc52vecnv4q");
        _mint(msg.sender, 2, 1, "");
        ERC1155URIStorage._setURI(2, "ipfs://bafkreifoet4s7amkkcwquku5sqbtaeqbpfbir6fw7p4pcy7cavfc77rjp4");
        _mint(msg.sender, 3, 1, "");
        ERC1155URIStorage._setURI(3, "ipfs://bafkreifanvm3dcwm4vtvx3yeqmywosgou5jhlmuofttxaqu2ltahdcdm5i");
        _mint(msg.sender, 4, 1, "");
        ERC1155URIStorage._setURI(4, "ipfs://bafkreih7zgn32h4e3rxggjedjzlpsgixbqcj3ymg2k6fcky2rfofoeb2hi");
        _mint(msg.sender, 5, 1, "");
        ERC1155URIStorage._setURI(5, "ipfs://bafkreiasia5tlp7bycn72ozt2hhro52huwhr4ok3m64aakwqcwdywowd3e");
        _mint(msg.sender, 6, 1, "");
        ERC1155URIStorage._setURI(6, "ipfs://bafkreigpzr4mltujdlcmpuzkss4homu5yru6viy3jwniwgsi2hnqabm4j4");
        _mint(msg.sender, 7, 1, "");
        ERC1155URIStorage._setURI(7, "ipfs://bafkreihn3rjcmtjfpxllr5damkicy73yocxz42v2aebsu22xpr72xiedtm");
        _mint(msg.sender, 8, 1, "");
        ERC1155URIStorage._setURI(8, "ipfs://bafkreicedgufihulo3xevpsiqz74al6iye4yjhhzhlv4r7aofukpwi4f6e");
        _mint(msg.sender, 9, 1, "");
        ERC1155URIStorage._setURI(9, "ipfs://bafkreiditbqlceij5a6cynyde7xc4zybtapfzeli3jl72lb2rjzissuwvi");
        _mint(msg.sender, 10, 1, "");
        ERC1155URIStorage._setURI(10, "ipfs://bafkreiexuyuxbem4qa47culffcbyj3zm3mamamizimryacmaf4zxob57zq");
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
