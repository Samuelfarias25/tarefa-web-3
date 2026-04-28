// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OraculoETHUSD is Ownable {
    AggregatorV3Interface internal priceFeed;

    constructor(address _feed) {
        priceFeed = AggregatorV3Interface(_feed);
    }

    function getLatestPrice() public view returns (int) {
        (
            ,
            int price,
            ,
            ,
        ) = priceFeed.latestRoundData();
        return price;
    }
}
