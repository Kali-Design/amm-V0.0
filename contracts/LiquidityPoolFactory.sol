//SPDX-License-Identifier: MIT
  
pragma solidity ^0.8.6;
import "./interfaces/SmartLiquidityPool_factory.sol";
import "./LiquidityPool.sol";

contract LiquidityPoolFactory is SmartLiquidityPoolFactory {
    address public override feeTo;
    address public override feeToSetter;

    mapping(address => mapping(address => address)) public override getPair;
    address[] public override allPairs;

    constructor(address _feeToSetter) {
        feeToSetter = _feeToSetter;
    }

    function allPairsLength() external view override returns (uint) {
        return allPairs.length;
    }

    function createPair(address tokenA, address tokenB) external override returns (LiquidityPool) {
        require(tokenA != tokenB, "UniswapV2: IDENTICAL_ADDRESSE");
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), "UniswapV2: ZERO_ADDRESS");
        require(getPair[token0][token1] == address(0), "UniswapV2: PAIR_EXISTS"); // single check is sufficient

        LiquidityPool pool = new LiquidityPool(tokenA, tokenB);
        getPair[token0][token1] = address(pool);
        getPair[token1][token0] = address(pool); // populate mapping in the reverse direction
        allPairs.push(address(pool));
        emit PairCreated(token0, token1, address(pool), allPairs.length);
        return pool;
    }

    function setFeeTo(address _feeTo) override external {
        require(msg.sender == feeToSetter, "UniswapV2: FORBIDDEN");
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external override {
        require(msg.sender == feeToSetter, "UniswapV2: FORBIDDEN");
        feeToSetter = _feeToSetter;
    }

    function getPool(address token0_, address token1_) external view returns (address) {
        return getPair[token0_][token1_];
    }
}
