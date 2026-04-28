

import { ethers } from "hardhat";

async function main() {
  // Deploy MeuToken
  const MeuToken = await ethers.getContractFactory("MeuToken");
  const meuToken = await MeuToken.deploy();
  await meuToken.waitForDeployment();
  console.log("MeuToken:", await meuToken.getAddress());

  // Deploy MeuNFT
  const MeuNFT = await ethers.getContractFactory("MeuNFT");
  const meuNFT = await MeuNFT.deploy();
  await meuNFT.waitForDeployment();
  console.log("MeuNFT:", await meuNFT.getAddress());

  // Deploy Staking
  const Staking = await ethers.getContractFactory("Staking");
  const staking = await Staking.deploy(await meuToken.getAddress());
  await staking.waitForDeployment();
  console.log("Staking:", await staking.getAddress());

  // Deploy Governanca
  const Governanca = await ethers.getContractFactory("Governanca");
  const governanca = await Governanca.deploy();
  await governanca.waitForDeployment();
  console.log("Governanca:", await governanca.getAddress());

  // Deploy OraculoETHUSD (exemplo com Chainlink Sepolia ETH/USD)
  const ORACLE_FEED = "0x694AA1769357215DE4FAC081bf1f309aDC325306"; // Chainlink Sepolia ETH/USD
  const OraculoETHUSD = await ethers.getContractFactory("OraculoETHUSD");
  const oraculo = await OraculoETHUSD.deploy(ORACLE_FEED);
  await oraculo.waitForDeployment();
  console.log("OraculoETHUSD:", await oraculo.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
