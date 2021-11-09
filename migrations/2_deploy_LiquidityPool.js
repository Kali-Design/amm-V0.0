const LiquidityPool= artifacts.require('LiquidityPool');

module.exports = async (deployer, accounts) => {
  await deployer.deploy(LiquidityPool, accounts[0], { from: accounts[0] });
};