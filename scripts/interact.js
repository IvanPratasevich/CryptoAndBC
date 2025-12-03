const { ethers } = require("hardhat");
const PROXY_ADDRESS = "0x8dE9Ee2754d1C42192fc4E7aDE74c788eF812111";
const ivanAccount2 = "0x173e2fb370ad50961ebd369caddbb2c8ef1084b8";

async function main() {
    const [owner] = await ethers.getSigners();
    const token = await ethers.getContractAt("GreenTokenV1", PROXY_ADDRESS);

    console.log("ivan:", owner.address);
    console.log("token:", await token.name(), await token.symbol());
    console.log("ivan balance:", ethers.formatUnits(await token.balanceOf(owner.address), 18));

    console.log('\n-----------------------------------------')
    console.log('Minting')

    console.log("ivan2 balance before minting:", ethers.formatUnits(await token.balanceOf(ivanAccount2), 18));
    console.log("minting 500 tokens to ivan2:");
    const mint = await token.mint(ivanAccount2, ethers.parseUnits("500", 18));
    await mint.wait();

    console.log("ivan2 balance after minting:", ethers.formatUnits(await token.balanceOf(ivanAccount2), 18));

    console.log('-----------------------------------------')
    console.log("ivan1 balance before transfer:", ethers.formatUnits(await token.balanceOf(owner.address), 18));
    console.log("ivan2 balance before transfer:", ethers.formatUnits(await token.balanceOf(ivanAccount2), 18));

    console.log("\ntransfer tokens")
    console.log("transferring 200 tokens");
    const transfer = await token.transfer(ivanAccount2, ethers.parseUnits("200", 18));
    await transfer.wait();

    console.log("\nbalances:")
    console.log("ivan1 owner:", ethers.formatUnits(await token.balanceOf(owner.address), 18));
    console.log("ivan2:", ethers.formatUnits(await token.balanceOf(ivanAccount2), 18));
    console.log('-----------------------------------------')
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});