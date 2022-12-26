const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RealEstate", () => {
  let realEstate, escrow;
  let deployer, seller;
  let nftID = 1;

  beforeEach(async () => {
    //setup accounts
    accounts = await ethers.getSigners();
    deployer = accounts[0];
    seller = deployer;

    const RealEstate = await ethers.getContractFactory("RealEstate");
    const Escrow = await ethers.getContractFactory("Escrow");

    realEstate = await RealEstate.deploy();
    escrow = await Escrow.deploy();
  });

  describe("Deployment", async () => {
    it("sends an NFT to the seller / deployer", async () => {
      expect(await realEstate.ownerOf(nftID)).to.equal(seller.address);
    });
  });
});
