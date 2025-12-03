const { ethers, upgrades } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("my address:", deployer.address);

    const GreenTokenV1 = await ethers.getContractFactory("GreenTokenV1");

    const initSupply = ethers.parseEther("3000000");

    const proxy = await upgrades.deployProxy(GreenTokenV1, [initSupply], {
        initializer: "initialize",
        kind: "transparent"
    });

    await proxy.waitForDeployment();
    const proxyAddress = await proxy.getAddress();

    console.log("proxy address:", proxyAddress);
    console.log("implementation address:", await upgrades.erc1967.getImplementationAddress(proxyAddress));
    console.log("proxyAdmin address:", await upgrades.erc1967.getAdminAddress(proxyAddress));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
