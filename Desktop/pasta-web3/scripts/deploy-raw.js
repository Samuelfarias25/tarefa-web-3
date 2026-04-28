import { ethers } from "ethers";
import fs from "fs";
import dotenv from "dotenv";

// Carrega as variáveis do seu arquivo .env
dotenv.config();

async function main() {
  console.log("🚀 Iniciando deploy puro via Ethers (Bypass Hardhat)...");

  if (!process.env.SEPOLIA_URL || !process.env.PRIVATE_KEY) {
    throw new Error("⚠️ Faltando SEPOLIA_URL ou PRIVATE_KEY no arquivo .env");
  }

  // Conecta na blockchain diretamente usando a URL do seu provedor (Alchemy/Infura)
  const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  console.log("📡 Carteira conectada:", wallet.address);

  // Função cirúrgica para ler o contrato compilado e fazer o deploy
  async function deployContract(contractName, ...args) {
    const path = `./artifacts/contracts/${contractName}.sol/${contractName}.json`;
    const file = fs.readFileSync(path, "utf8");
    const artifact = JSON.parse(file);
    
    const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);
    console.log(`⏳ Enviando transação do ${contractName}...`);
    
    const contract = await factory.deploy(...args);
    await contract.waitForDeployment();
    
    const address = await contract.getAddress();
    console.log(`✅ ${contractName}: ${address}`);
    return address;
  }

  // Executando os deploys na ordem exata
  const tokenAddress = await deployContract("MeuToken");
  const nftAddress = await deployContract("MeuNFT");
  const stakingAddress = await deployContract("Staking", tokenAddress);
  const govAddress = await deployContract("Governanca");

  // Oráculo Chainlink ETH/USD na Sepolia
  const ORACLE_FEED = "0x694AA1769357215DE4FAC081bf1f309aDC325306";
  const oracleAddress = await deployContract("OraculoETHUSD", ORACLE_FEED);

  console.log("🎉 DEPLOY FINALIZADO COM SUCESSO!");
}

main().catch(console.error);