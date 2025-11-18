const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contract with account:", deployer.address);

    const MyToken = await ethers.getContractFactory("MyToken");
    const initialSupply = ethers.parseEther("1000000");
    const myToken = await MyToken.deploy(initialSupply);

    console.log("MyToken deployed to:", myToken.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
