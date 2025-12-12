const { printBalances } = require("../balance");

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

async function main() {
    const [owner, student2] = await ethers.getSigners();
    console.log("Owner: ", owner.address);
    console.log("Student2: ", student2.address);
    const gameCharacter = await ethers.getContractAt("GameCharacterERC1155", CONTRACT_ADDRESS);
    for (let id of [1,2,3,4,5,6,7,8,9,10]) {
        const uri = await gameCharacter.uri(id);
        console.log(`Token ${id} URI: ${uri}`);

        let url = uri.replace("ipfs://", "https://ipfs.io/ipfs/");
        const res = await fetch(url);
        const metadata = await res.json();
        console.log(`Metadata for token ${id}:`, metadata);
    }
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
        student2.address,
        [5, 6], // token IDs
        [1, 1], // amounts
        "0x",
    );
    await tx2.wait();

    console.log("SENT Token 5 and 6 to STUDENT2!");

    console.log("--------OWNER AFTER------------");
    await printBalances(gameCharacter, owner.address, "owner");

    console.log("---------STUDENT2 AFTER----------");
    await printBalances(gameCharacter, student2.address, "student2");
}

main().catch(console.error);
