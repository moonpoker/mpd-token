//SPDX-License-Identifier: MIT
pragma solidity >= 0.5.0 < 0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MPDToken is ERC20 {
  address manager = 0x2Abdb157b2603e17d531d4fc51a4fc6174c3dAEA;
  uint256 initialSupply = 150000000 * (10**18);

  constructor() ERC20("Moon Poker DAO", "GLD") public {
    _mint(manager, initialSupply);
  }

  modifier onlyManager() {
    require(msg.sender == manager, "MPD_ERR_NOT_AUTHORIZED");
    _;
  }

  function mint(uint256 quantity, address destination) public onlyManager {
    _mint(destination, quantity);
  }

  function setManager(address newManager) public onlyManager {
    manager = newManager;
  }
}
