//SPDX-License-Identifier: MIT
  
pragma solidity ^0.8.6;

import "./LiquidityPool.sol";

contract LiquidityPoolFactory {
    address public override feeTo;
    address public override feeToSetter;

    mapping(address => mapping(address => address)) public override getPair;
    address[] public override allPairs;

    constructor(address _feeToSetter) {
        feeToSetter = _feeToSetter;
    }

    function createPair(address tokenA, address tokenB) external override returns (LiquidityPool) {
        require(tokenA != tokenB, "UniswapV2: IDENTICAL_ADDRESSE");
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), "UniswapV2: ZERO_ADDRESS");
        require(getPair[token0][token1] == address(0), "UniswapV2: PAIR_EXISTS"); // single check is sufficient

        LiquidityPool pool = new LiquidityPool(tokenA, tokenB);
        getPair[token0][token1] = address(pool);
        getPair[token1][token0] = address(pool); // populate mapping in the reverse direction
        
    }
}
