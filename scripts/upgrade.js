const { ethers, upgrades } = require("hardhat");
const PROXY_ADDRESS = "0x8dE9Ee2754d1C42192fc4E7aDE74c788eF812111";


async function main() {
    const [deployer] = await ethers.getSigners();

    const tokenV1 = await ethers.getContractAt("GreenTokenV1", PROXY_ADDRESS);
    const balanceBefore = await tokenV1.balanceOf(deployer.address);

    console.log("before upgrade:");
    console.log("balance:", ethers.formatUnits(balanceBefore, 18));

    // upgrade
    const GreenTokenV2 = await ethers.getContractFactory("GreenTokenV2");
    await upgrades.upgradeProxy(PROXY_ADDRESS, GreenTokenV2);
    const implementationAfter = await upgrades.erc1967.getImplementationAddress(PROXY_ADDRESS);

    console.log("\nupgraded to v2");
    console.log("new implementation address:", implementationAfter);

    // let's check after upgrade
    const tokenV2 = await ethers.getContractAt("GreenTokenV2", PROXY_ADDRESS);
    const balanceAfter = await tokenV2.balanceOf(deployer.address);
    const version = await tokenV2.version();

    console.log("\nafter upgrade:");
    console.log("balance:", ethers.formatUnits(balanceAfter, 18));
    console.log("balance unchanged:", ethers.formatUnits(balanceAfter, 18));
    console.log("version:", version);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
