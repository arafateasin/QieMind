// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract QIEVault {
    address public owner; // You (The Developer)
    address public aiAgent; // The Python Script (Simulated)

    event Deposit(address indexed sender, uint256 amount);
    event TradeExecuted(string token, string action, uint256 amount);
    event EmergencyWithdraw(uint256 amount);

    constructor(address _aiAgent) {
        owner = msg.sender;
        aiAgent = _aiAgent;
    }

    // 1. Function to accept money (Deposits)
    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    // 2. The AI calls this to "simulate" a trade
    function executeTrade(
        string memory token,
        string memory action,
        uint256 amount
    ) external {
        // Allow either the AI agent OR the owner (you) to execute trades for the demo
        require(
            msg.sender == aiAgent || msg.sender == owner,
            "Not authorized AI"
        );
        emit TradeExecuted(token, action, amount);
    }

    // 3. Emergency Withdraw (The Red Button on your website)
    function emergencyWithdraw() external {
        require(msg.sender == owner, "Only Owner");
        uint256 balance = address(this).balance;
        payable(owner).transfer(balance);
        emit EmergencyWithdraw(balance);
    }

    // 4. Check Balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
