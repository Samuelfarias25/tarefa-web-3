// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Staking is Ownable, ReentrancyGuard {
    IERC20 public token;
    mapping(address => uint256) public balances;
    mapping(address => uint256) public rewards;
    uint256 public rewardRate = 10;

    constructor(address _token) {
        token = IERC20(_token);
    }

    function stake(uint256 amount) external nonReentrant {
        require(amount > 0, "Valor invalido");
        token.transferFrom(msg.sender, address(this), amount);
        balances[msg.sender] += amount;
        rewards[msg.sender] += amount * rewardRate / 100;
    }

    function withdraw(uint256 amount) external nonReentrant {
        require(balances[msg.sender] >= amount, "Saldo insuficiente");
        balances[msg.sender] -= amount;
        token.transfer(msg.sender, amount);
    }

    function claimReward() external nonReentrant {
        uint256 reward = rewards[msg.sender];
        require(reward > 0, "Sem recompensa");
        rewards[msg.sender] = 0;
        token.transfer(msg.sender, reward);
    }
}