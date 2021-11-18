/* eslint-disable no-unused-expressions */
const { accounts, contract } = require('@openzeppelin/test-environment');
const { time } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

const LiquidityPool = contract.fromArtifact('LiquidityPool');

describe('LiquidityPool', async function () {
  const [dev, owner, user1] = accounts;
  const MESSAGE = 'WELCOME TO MY COURSES';
  const _MESSAGE = 'NEW MESSAGE';

  context('LiquidityPool initial state', function () {
    // Execute this before each tests
    beforeEach(async function () {
      this.liquiditypool = await LiquidityPool.new(owner, MESSAGE, { from: dev });
    });

    it(`has message ${MESSAGE}`, async function () {
      expect(await this.liquiditypool.getMessage()).to.equal(MESSAGE);
    });

    it('has owner', async function () {
      expect(await this.liquiditypool.owner()).to.equal(owner);
    });

    it('has starting date', async function () {
      const _current = await time.latest();
      expect(await this.liquiditypool.getStartDate()).to.be.a.bignumber.equal(_current);
    });
  });

  context('LiquidityPool ownership', function () {
    beforeEach(async function () {
      this.liquiditypool = await this.liquiditypool.new(owner, MESSAGE, { from: dev });
    });
    it('set message', async function () {
      await this.liquiditypool.setMessage(_MESSAGE, { from: owner });
      expect(await this.liquiditypool.getMessage()).to.equal(_MESSAGE);
    });
  });
  context('LiquidityPool time functions', function () {
    beforeEach(async function () {
      this.account = await liquiditypool.new(owner, MESSAGE, { from: dev });
    });
    it('handles not finished yet', async function () {
      expect(await this.liquiditypool.goodbye({ from: user1 })).to.equal('not finished yet!!');
    });

    it('handles finished courses', async function () {
      await time.increase(time.duration.weeks(24));
      expect(await liquiditypool.goodbye({ from: user1 })).to.equal('congratulations and goodbye!!');
    });
  });
});
