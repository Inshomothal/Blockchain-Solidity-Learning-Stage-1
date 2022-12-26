//Tests go here.
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Counter", () => {
  //Tutorial note: Can pass in a function using '=>'
  let counter;

  beforeEach(async () => {
    const Counter = await ethers.getContractFactory("Counter"); //Ethers contract
    counter = await Counter.deploy("My Counter", 1); //Deployed smart contract
  });

  describe("Deployment", () => {
    it("stores the count", async () => {
      expect(await counter.count()).to.equal(1);
      //fetch the count
      //check the count to make sure it's what we expect
    });

    it("stores the name", async () => {
      const name = await counter.name(); //Actual count we're reading
      expect(name).to.equal("My Counter");
      //fetch the count
      //check the count to make sure it's what we expect
    });
  });

  describe("Counting", () => {
    let transaction;

    it('reads the count from the "count()" public variable', async () => {
      expect(await counter.count()).to.equal(1);
    });

    it('reads the count from the "getCount()" public variable', async () => {
      expect(await counter.getCount()).to.equal(1);
    });

    it("increments the count", async () => {
      transaction = await counter.increment();
      await transaction.wait();

      expect(await counter.count()).to.equal(2);

      transaction = await counter.increment();
      await transaction.wait();

      expect(await counter.count()).to.equal(3);
    });

    it("decrements the count", async () => {
      transaction = await counter.decrement();
      await transaction.wait();

      expect(await counter.count()).to.equal(0);

      await expect(counter.decrement()).to.be.reverted;
    });

    it('reads the name from the "name()" public variable', async () => {
      expect(await counter.name()).to.equal("My Counter");
    });

    it('reads the name from the "getName()" public variable', async () => {
      expect(await counter.getName()).to.equal("My Counter");
    });

    it("updates the name", async () => {
      transaction = await counter.setName("New Name");
      await transaction.wait();
      expect(await counter.name()).to.equal("New Name");
    });
  });
});
