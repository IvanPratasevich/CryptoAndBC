const { ethers } = require("hardhat");

async function main() {
    const [ownerStudent1] = await ethers.getSigners();
    const VISIT_CARD_ADDRESS = "0xdEFAA689AFE32E8984c72ebFB45d5Ba353B4f8cd";
    const IPFS_URI_STUDENT1 = "ipfs://bafkreigtuuhoxl7zzus6f6n7ozqaj362yqn7bu5zcwhrfxx64oxickpqqi";
    const IPFS_URI_STUDENT2 = "ipfs://bafkreibojiiltf5hlbabtpzybrfqlx26ay4elj77ogzvej4nrd7z5ufxwa";
    const student2 = "0x173e2fb370ad50961ebd369caddbb2c8ef1084b8"
    console.log("student1:", ownerStudent1.address);
    console.log("student2:", student2);

    const visitCard = await ethers.getContractAt("SoulboundVisitCardERC721", VISIT_CARD_ADDRESS);

    console.log("--------------------------");
    try {
        const tx1 = await visitCard.mintVisitCard(ownerStudent1.address, IPFS_URI_STUDENT1);
        const receipt1 = await tx1.wait();

        console.log("Student1 minted! Tx:", receipt1.hash);

        const mintedEvent1 = receipt1.logs
            .map((log) => visitCard.interface.parseLog(log))
            .find((event) => event?.name === "CardMinted");

        const tokenId1 = mintedEvent1.args.tokenId;
        console.log("Token ID Student1:", tokenId1.toString());
        console.log("Student Student1:", mintedEvent1.args.student);
        console.log("URI Student1:", mintedEvent1.args.uri);
        console.log("tokenURI check Student1:", await visitCard.tokenURI(tokenId1));
    } catch (error) {
        console.log("Student1 FAILED:", error.message);
    }

    console.log("--------------------------");
    console.log("MINT STUDENT 2");
    try {
        const tx2 = await visitCard.mintVisitCard(student2, IPFS_URI_STUDENT2);
        const receipt2 = await tx2.wait();

        console.log("Student2 minted! Tx:", receipt2.hash);

        const mintedEvent2 = receipt2.logs
            .map((log) => visitCard.interface.parseLog(log))
            .find((event) => event?.name === "CardMinted");

        const tokenId2 = mintedEvent2.args.tokenId;
        console.log("Token ID Student2:", tokenId2.toString());
        console.log("Student Student2:", mintedEvent2.args.student);
        console.log("URI Student2:", mintedEvent2.args.uri);
        console.log("tokenURI check:", await visitCard.tokenURI(tokenId2));
    } catch (error) {
        console.log("Student2 FAILED:", error.message);
    }


    // console.log("NOT OWNER CAN'T MINT");
    //
    // try {
    //     const visitCardStudent2 = visitCard.connect(student2);
    //     const txStudent2 = await visitCardStudent2.mintVisitCard(student3.address, "ipfs://test1234");
    //     await txStudent2.wait();
    // } catch (error) {
    //     console.log("owner works", error.message);
    // }

    console.log("\nFINAL STATS");
    console.log("Student1 balance:", (await visitCard.balanceOf(ownerStudent1.address)).toString());
    console.log("Student2 balance:", (await visitCard.balanceOf(student2)).toString());
}

main().catch((error) => console.error("FATAL ERROR:", error.message));
