//SPDX-License-Identifier: MIT
pragma solidity >= 0.5.0 < 0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MPDToken is ERC20 {
  address manager = 0xF5D2e347a2D51f77FdC824Db534a709cdBe5F7cD;
  uint256 initialSupply = 150000000 * (10**18);

  constructor() ERC20("Moon Poker DAO", "MPD") public {
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
