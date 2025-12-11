// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SoulboundVisitCardERC721 is ERC721, ERC721URIStorage, Ownable {
    // counter for token IDs
    uint256 public counterIds;

    mapping(string => bool) private usedURIs;

    // event for tracking minting
    event CardMinted(address indexed student, uint256 indexed tokenId, string uri);

    constructor() ERC721("VisitCard", "VC") Ownable(msg.sender) {}

    function mintVisitCard(address student, string memory uri) external onlyOwner returns (uint256) {
        // 1 token per student
        require(balanceOf(student) == 0, "Student already has token");
        // no duplicates
        require(!usedURIs[uri], "URI already used");
        // assign new token id
        counterIds = counterIds + 1;
        uint256 tokenId = counterIds;
        // mint + set URI
        _safeMint(student, tokenId);
        _setTokenURI(tokenId, uri);
        // block URI reuse
        usedURIs[uri] = true;

        emit CardMinted(student, tokenId, uri);
        return tokenId;
    }

    function transferFrom(address, address, uint256) public pure override (ERC721, IERC721) {
        revert("Transfers disabled");
    }
    function approve(address, uint256) public pure override(ERC721, IERC721) {
        revert("Approvals disabled");
    }

    function setApprovalForAll(address, bool) public pure override(ERC721, IERC721) {
        revert("Approvals disabled");
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
