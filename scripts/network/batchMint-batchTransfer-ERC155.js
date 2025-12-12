const { printBalances } = require("../balance");

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const student2 = "0x173e2fb370ad50961ebd369caddbb2c8ef1084b8"; // ivan2 account


async function main() {
    const [owner] = await ethers.getSigners();
    const gameCharacter = await ethers.getContractAt("GameCharacterERC1155", CONTRACT_ADDRESS);
    console.log('Balance before. owner')
    await printBalances(gameCharacter, owner.address, "owner");
    console.log("--------------------");
    console.log("BATCH MINT");
    const ids = [1, 2];
    const amount = [1, 1];
    const tx = await gameCharacter.mintBatch(owner.address, ids, amount, "0x");
    await tx.wait();

    console.log("Minted!!!!!");

    await printBalances(gameCharacter, owner.address, "owner");

    const tx2 = await gameCharacter.safeBatchTransferFrom(
        owner.address,
        student2,
        [5, 6], // token IDs
        [1, 1], // amounts
        "0x",
    );
    await tx2.wait();

    console.log("SENT Token 5 and 6 to STUDENT2!");

    console.log("--------OWNER AFTER------------");
    await printBalances(gameCharacter, owner.address, "owner");

    console.log("---------STUDENT2 AFTER----------");
    await printBalances(gameCharacter, student2, "student2");
}

main().catch(console.error);
