/* eslint-disable no-unused-expressions */
const { accounts, contract } = require('@openzeppelin/test-environment');
const { time } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

const SmartLiquidityPool = contract.fromArtifact('SmartLiquidityPool');

describe('SmartLiquidityPool ', async function () {
  const [dev, owner, user1] = accounts;
  const MESSAGE = 'WELCOME TO MY LIQUIDITY';
  const _MESSAGE = 'NEW MESSAGE';

  context('SmartLiquidityPool  initial state', function () {
    // Execute this before each tests
    beforeEach(async function () {
      this.smartliquiditypool = await smartliquiditypool.new(owner, MESSAGE, { from: dev });
    });

    it(`has message ${MESSAGE}`, async function () {
      expect(await this.smartliquiditypool.getMessage()).to.equal(MESSAGE);
    });

    it('has owner', async function () {
      expect(await this.smartliquiditypool.owner()).to.equal(owner);
    });

    it('has starting date', async function () {
      const _current = await time.latest();
      expect(await this.smartliquiditypool.getStartDate()).to.be.a.bignumber.equal(_current);
    });
  });

  context('SmartLiquidityPool ownership', function () {
    beforeEach(async function () {
      this.smartliquiditypool = await this.smartliquiditypool.new(owner, MESSAGE, { from: dev });
    });
    it('set message', async function () {
      await this.smartliquiditypool.setMessage(_MESSAGE, { from: owner });
      expect(await this.smartliquiditypool.getMessage()).to.equal(_MESSAGE);
    });
  });
  context('SmartLiquidityPool time functions', function () {
    beforeEach(async function () {
      this.account = await smartliquiditypool.new(owner, MESSAGE, { from: dev });
    });
    it('handles not finished yet', async function () {
      expect(await this.smartliquiditypool.goodbye({ from: user1 })).to.equal('not finished yet!!');
    });

    it('handles finished liquidity', async function () {
      await time.increase(time.duration.weeks(24));
      expect(await smartliquiditypool.goodbye({ from: user1 })).to.equal('congratulations and goodbye!!');
    });
  });
});
