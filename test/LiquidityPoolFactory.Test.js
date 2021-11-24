/* eslint-disable no-unused-expressions */
const { accounts, contract } = require('@openzeppelin/test-environment');
const { time } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

const LiquidityPoolFactory = contract.fromArtifact('LiquidityPoolFactory');

describe('LiquidityPoolFactory', async function () {
  const [dev, owner, user1] = accounts;
  const MESSAGE = 'WELCOME TO MY COURSES';
  const _MESSAGE = 'NEW MESSAGE';

  context('LiquidityPoolFactory initial state', function () {
    // Execute this before each tests
    beforeEach(async function () {
      this.liquiditypoolfactory = await LiquidityPoolFactory.new(owner, MESSAGE, { from: dev });
    });

    it(`has message ${MESSAGE}`, async function () {
      expect(await this.liquiditypoolfactory.getMessage()).to.equal(MESSAGE);
    });

    it('has owner', async function () {
      expect(await this.liquiditypoolfactory.owner()).to.equal(owner);
    });

    it('has starting date', async function () {
      const _current = await time.latest();
      expect(await this.liquiditypoolfactory.getStartDate()).to.be.a.bignumber.equal(_current);
    });
  });

  context('LiquidityPoolFactory ownership', function () {
    beforeEach(async function () {
      this.liquiditypoolfactory = await this.liquiditypoolfactory.new(owner, MESSAGE, { from: dev });
    });
    it('set message', async function () {
      await this.liquiditypoolfactory.setMessage(_MESSAGE, { from: owner });
      expect(await this.liquiditypoolfactory.getMessage()).to.equal(_MESSAGE);
    });
  });
  context('LiquidityPoolFactory time functions', function () {
    beforeEach(async function () {
      this.account = await liquiditypoolfactory.new(owner, MESSAGE, { from: dev });
    });
    it('handles not finished yet', async function () {
      expect(await this.liquiditypoolfactory.goodbye({ from: user1 })).to.equal('not finished yet!!');
    });

    it('handles finished courses', async function () {
      await time.increase(time.duration.weeks(24));
      expect(await liquiditypoolfactory.goodbye({ from: user1 })).to.equal('congratulations and goodbye!!');
    });
  });
});
