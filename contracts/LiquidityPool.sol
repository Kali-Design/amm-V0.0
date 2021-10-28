//SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LiquidityPool is ERC20 {
  address public token0;
  address public token1;

  uint private _reserve0;
  uint private _reserve1;

  constructor(address token0_, address token1_) ERC20("LiquidityPool", "John-LP") {
    token0 = token0_;
    token1 = token1_;
  }

  
  function add(uint amount0, uint amount1) public {

    if (_reserve0 == 0 && _reserve1 == 0) {
        IERC20(token0).transferFrom(msg.sender, address(this), amount0);
        IERC20(token1).transferFrom(msg.sender, address(this), amount1);
        _mint(msg.sender, amount0 * amount1);
    } else {
        require(amount0 * 100 / _reserve0 == amount1 * 100 / _reserve1, "the ration need to be equal");
        IERC20(token0).transferFrom(msg.sender, address(this), amount0);
        IERC20(token1).transferFrom(msg.sender, address(this), amount1);

        uint rate = amount0 * 100 / _reserve0;
        uint currentSupply = totalSupply();         
        uint newSupply = currentSupply * rate / 100;
        _mint(msg.sender, newSupply - currentSupply);
    }

    _reserve0 += amount0;
    _reserve1 += amount1;
  }

  function remove(uint liquidity) public {

    transfer(address(this), liquidity);

    uint currentSupply = totalSupply();
    uint amount0 = liquidity * _reserve0 / currentSupply;
    uint amount1 = liquidity * _reserve1 / currentSupply;
    

    _burn(address(this), liquidity);

    _reserve0 = _reserve0 - amount0;
    _reserve1 = _reserve1 - amount1;

    IERC20(token0).transfer(msg.sender, amount0);
    IERC20(token1).transfer(msg.sender, amount1);
  }
}
*/Working progress/*
