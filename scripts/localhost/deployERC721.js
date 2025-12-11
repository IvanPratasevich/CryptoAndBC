const { ethers } = require("hardhat");

async function main() {
    const [owner] = await ethers.getSigners();

    console.log("deployer:", owner.address);

    const VisitCard = await ethers.getContractFactory("SoulboundVisitCardERC721");
    const visitCard = await VisitCard.deploy();
    await visitCard.waitForDeployment();

    console.log("VisitCard deployed at:", await visitCard.getAddress());
}

main().catch(console.error);
