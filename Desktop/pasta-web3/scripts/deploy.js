import hre from "hardhat";

async function main() {
  console.log("Iniciando deploy na rede Sepolia...");

  // Puxando o ethers do Hardhat Runtime Environment
  const { ethers } = hre;

  if (!ethers) {
    throw new Error("❌ O plugin ethers não foi carregado. O Hardhat leu o arquivo de config errado!");
  }

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

  // Deploy OraculoETHUSD
  const ORACLE_FEED = "0x694AA1769357215DE4FAC081bf1f309aDC325306";
  const OraculoETHUSD = await ethers.getContractFactory("OraculoETHUSD");
  const oraculo = await OraculoETHUSD.deploy(ORACLE_FEED);
  await oraculo.waitForDeployment();
  console.log("OraculoETHUSD:", await oraculo.getAddress());

  console.log("✅ Todos os contratos foram implantados com sucesso!");
}

main().catch((error) => {
  console.error("Erro durante o deploy:", error);
  process.exitCode = 1;
});