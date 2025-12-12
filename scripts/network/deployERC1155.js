const { ethers } = require("hardhat");

async function main() {
    const GameCharacter = await ethers.getContractFactory("GameCharacterERC1155");
    const gameCharacter = await GameCharacter.deploy();
    await gameCharacter.waitForDeployment();

    console.log("Deployed to:", await gameCharacter.getAddress());
}

main().catch(console.error);