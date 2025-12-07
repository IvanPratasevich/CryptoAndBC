const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MultiSigWallet", function () {
    let wallet, addr1, addr2, addr3, notOwner;

    beforeEach(async function () {
        [addr1, addr2, addr3, notOwner] = await ethers.getSigners();
        const w = await ethers.getContractFactory("MultiSigWallet");
        const numConfirmRequired = 2;
        wallet = await w.deploy([addr1.address, addr2.address],  numConfirmRequired);
        await wallet.waitForDeployment();
        // add money
        await addr1.sendTransaction({ to: await wallet.getAddress(), value: ethers.parseEther("10") });
    });


    it("Should deploy with owners and confirmations", async function () {
        expect(await wallet.owners(0)).to.equal(addr1.address);
        expect(await wallet.owners(1)).to.equal(addr2.address);

        expect(await wallet.numConfirmationsRequired()).to.equal(2);

        expect(await wallet.isOwner(addr1.address)).to.be.true;
        expect(await wallet.isOwner(addr3.address)).to.be.false;
    });

    // transaction submission by owner
    it("should allow owner to submit transaction and emit event", async function () {
        // owner (addr1) submits a new transaction:
        const tx = await wallet.submitTransaction(addr3.address, ethers.parseEther("1"), "0x");
        await tx.wait();
        // check that the SubmitTransaction event was emitted with the correct arguments
        await expect(tx).to.emit(wallet, "SubmitTransaction").withArgs(addr1.address, 0, addr3.address, ethers.parseEther("1"), "0x");

        // retrieve the stored transaction at index 0
        const transaction = await wallet.transactions(0);

        // verify that fields are correct
        expect(transaction.to).to.equal(addr3.address);
        expect(transaction.value).to.equal(ethers.parseEther("1"));
        expect(transaction.executed).to.be.false;
        expect(transaction.numConfirmations).to.equal(0);

        // verify the wallet now contains exactly one transaction
        expect(await wallet.getTransactionCount()).to.equal(1);
    });

    // confirmation and revocation by multiple owners
    it("should confirm and revoke transactions", async function () {
        await wallet.submitTransaction(addr3.address, ethers.parseEther("1"), "0x");

        // confirm by addr1
        const conf1 = await wallet.confirmTransaction(0);
        await expect(conf1).to.emit(wallet, "ConfirmTransaction").withArgs(addr1.address, 0);
        expect((await wallet.transactions(0)).numConfirmations).to.equal(1);
        expect(await wallet.isConfirmed(0, addr1.address)).to.be.true;

        // confirm by addr2
        await wallet.connect(addr2).confirmTransaction(0);
        expect((await wallet.transactions(0)).numConfirmations).to.equal(2);

        // revoke by addr1
        const rev = await wallet.revokeConfirmation(0);
        await expect(rev).to.emit(wallet, "RevokeConfirmation").withArgs(addr1.address, 0);
        expect((await wallet.transactions(0)).numConfirmations).to.equal(1);
        expect(await wallet.isConfirmed(0, addr1.address)).to.be.false;
    });

    // execution requires confirmations
    it("should execute only after required confirmations and emit event", async function () {
        await wallet.submitTransaction(addr3.address, ethers.parseEther("1"), "0x");

        // confirm by both owners
        await wallet.confirmTransaction(0);  // addr1 confirms
        await wallet.connect(addr2).confirmTransaction(0);  // addr2 confirms

        const balBefore = await ethers.provider.getBalance(addr3.address);
        const execTx = await wallet.executeTransaction(0);
        await expect(execTx).to.emit(wallet, "ExecuteTransaction").withArgs(addr1.address, 0);
        const transaction = await wallet.transactions(0);
        expect(transaction.executed).to.be.true;
        expect(await ethers.provider.getBalance(addr3.address)).to.equal(balBefore + ethers.parseEther("1"));
    });


    // edge cases
    describe("edge cases", function () {
        it("should prevent duplicate confirmations", async function () {
            await wallet.submitTransaction(addr3.address, 0, "0x");
            await wallet.confirmTransaction(0);
            // confirm the same transaction
            await expect(wallet.confirmTransaction(0)).to.be.revertedWith("Tx already confirmed");
        });

        it("should prevent unauthorized access. not owner", async function () {
            await wallet.submitTransaction(notOwner.address, 0, "0x");
            await expect(wallet.connect(notOwner).confirmTransaction(0)).to.be.revertedWith("Not owner");
            await expect(wallet.connect(notOwner).executeTransaction(0)).to.be.revertedWith("Not owner");
            // check error await wallet.connect(notOwner).executeTransaction(0)
            await expect(wallet.connect(notOwner).submitTransaction(addr1.address, 0, "0x")).to.be.revertedWith("Not owner");
        });

        it("should revert invalid transactions (not exist index, executed, not enough confirmations)", async function () {
            await expect(wallet.executeTransaction(999)).to.be.revertedWith("Tx does not exist");

            await wallet.submitTransaction(addr3.address, 0, "0x");

            // without confirmations
            await expect(wallet.executeTransaction(0)).to.be.revertedWith("Not enough confirmations");

            // do one confirmation
            await wallet.confirmTransaction(0);
            await expect(wallet.executeTransaction(0)).to.be.revertedWith("Not enough confirmations");
            await wallet.connect(addr2).confirmTransaction(0);
            await wallet.executeTransaction(0);

            // execute an already completed transaction
            await expect(wallet.executeTransaction(0)).to.be.revertedWith("Tx already executed");
        });

        it("should handle failed execution (low balance)", async function () {
            // we got 10eth on wallet
            await wallet.submitTransaction(addr3.address, ethers.parseEther("100"), "0x");
            await wallet.confirmTransaction(0);
            await wallet.connect(addr2).confirmTransaction(0);
            // low balance!!!
            await expect(wallet.executeTransaction(0)).to.be.revertedWith("Tx failed");
        });
    });
});
