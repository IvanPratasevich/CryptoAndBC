const { ethers } = require("hardhat");

async function printBalances(gameCharacter, targetAddress, title, maxId = 10) {
    console.log(`\nToken ID | Balance (${targetAddress.slice(0,10)}...) (${title})`);
    console.log("-------------------");

    for (let i = 1; i <= maxId; i++) {
        const balance = await gameCharacter.balanceOf(targetAddress, i);
        const balanceStr = balance.toString();

        console.log(`Token ${i}: ${balanceStr}`);
    }

}

module.exports = { printBalances };
