const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contract with account:", deployer.address);

    const RedToken = await ethers.getContractFactory("RedToken.sol");
    const initialSupply = ethers.parseEther("1000000");
    const redToken = await RedToken.deploy(initialSupply);

    console.log("RedToken.sol deployed to:", redToken.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
