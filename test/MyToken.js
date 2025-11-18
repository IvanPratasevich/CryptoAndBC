const { expect } = require('chai');
const { ethers } = require("hardhat");

describe("MyToken", function() {
    let owner, address1, address2, myToken, MyToken, initialSupply, supply;

    beforeEach(async () => {
        [owner, address1, address2] = await ethers.getSigners();
        MyToken = await ethers.getContractFactory("MyToken");
        initialSupply = ethers.parseEther("1000000");
        myToken = await MyToken.deploy(initialSupply);
        supply = ethers.parseEther("200");
        await myToken.waitForDeployment();
    });

    it('should deploy with correct initial supply', async function() {
        const ownerBalance = await myToken.balanceOf(owner.address)
        expect(ownerBalance).to.equal(initialSupply);
    })


    it("name and symbol should be correct", async function () {
        expect(await myToken.name()).to.equal("MyToken");
        expect(await myToken.symbol()).to.equal("MTK");
    });

    it('should be able to mint tokens', async function() {
        await myToken.mint(address1.address, supply);
        const balance = await myToken.balanceOf(address1.address)
        expect(balance).to.equal(supply);
    })

    it('non-owner should not mint tokens', async function() {
        await expect(myToken.connect(address1).mint(address2.address, supply)).to.be.reverted;
    })

    it('should transfer tokens between accounts maintain correct balances on wallets', async function() {
        const initialBalanceOwner = await myToken.balanceOf(owner.address)
        await myToken.transfer(address1, supply);
        const balance1 = await myToken.balanceOf(address1.address)
        const balanceOwner = await myToken.balanceOf(owner.address)
        expect(balance1).to.equal(supply);
        expect(balanceOwner).to.be.below(initialBalanceOwner)
        const balance2Initial = await myToken.balanceOf(address2.address)
        await myToken.connect(address1).transfer(address2.address, supply)
        const balance2 = await myToken.balanceOf(address2.address)
        expect(balance2).to.be.greaterThan(balance2Initial)
    })

    it('should fail while transferring more tokens than available balance', async function() {
        await myToken.transfer(address1, supply);
        supply = ethers.parseEther("100000000")
        await expect(myToken.connect(address1).transfer(address2.address, supply)).to.be.reverted
    })

    it('should fail while transferring tokens to invalid account', async function() {
        await myToken.transfer(address1.address, supply);
        supply = ethers.parseEther("100000000")
        const invalidAddress = "0x0000000000000000000000000000000000000000"
        await expect(myToken.connect(address1).transfer(invalidAddress, supply)).to.be.reverted
    })
})