const { expect } = require("chai");
const { ethers } = require("hardhat");
const { string } = require("hardhat/internal/core/params/argumentTypes");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

const ether = tokens;

describe("RealEstate", () => {
  let realEstate, escrow;
  let deployer, seller;
  let nftID = 1;
  let purchasePrice = ether(100);
  let escrowAmount = ether(20);

  beforeEach(async () => {
    //setup accounts
    accounts = await ethers.getSigners();
    deployer = accounts[0];
    seller = deployer;
    buyer = accounts[1];
    inspector = accounts[2];
    lender = accounts[3];

    const RealEstate = await ethers.getContractFactory("RealEstate");
    const Escrow = await ethers.getContractFactory("Escrow");

    realEstate = await RealEstate.deploy();
    escrow = await Escrow.deploy(
      realEstate.address,
      nftID,
      purchasePrice,
      escrowAmount,
      seller.address,
      buyer.address,
      inspector.address,
      lender.address
    );

    transaction = await realEstate
      .connect(seller)
      .approve(escrow.address, nftID);
    await transaction.wait();
  });

  describe("Deployment", async () => {
    it("sends an NFT to the seller / deployer", async () => {
      expect(await realEstate.ownerOf(nftID)).to.equal(seller.address);
    });
  });

  describe("Selling real estate", async () => {
    let balance, transaction;

    it("executes a successful transaction", async () => {
      //expect seller to be NFT owner before sell
      expect(await realEstate.ownerOf(nftID)).to.equal(seller.address);

      //buyer deposits earnest
      transaction = await escrow
        .connect(buyer)
        .depositEarnest({ value: escrowAmount });

      //Check balance
      balance = await escrow.getBalance();
      console.log("escrow balance ", ethers.utils.formatEther(balance));

      //Finalize sale
      transaction = await escrow.connect(buyer).finalizeSale();
      await transaction.wait();
      console.log("Buyer finalizes sale");

      //Expects buyer to be NFT owner after the sale
      expect(await realEstate.ownerOf(nftID)).to.equal(buyer.address);
    });
  });
});
