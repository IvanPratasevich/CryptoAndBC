// SPDX-License-Identifier: MIT
// https://www.quicknode.com/guides/ethereum-development/smart-contracts/how-to-create-and-deploy-an-upgradeable-erc20-token

pragma solidity ^0.8.0;

import "./GreenTokenV1.sol";

contract GreenTokenV2 is GreenTokenV1  {
    function version() public pure returns (string memory) {
        return "V2";
    }
}