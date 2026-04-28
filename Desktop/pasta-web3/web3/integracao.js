// Script simples usando ethers.js
// Instale as dependências: npm install ethers

const { ethers } = require("ethers");

// Configurações
const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/0282b98b09ef8f480a0bfa90c11e8120e9899311c62f27b2af683fb4c40add4e");
const privateKey = "0282b98b09ef8f480a0bfa90c11e8120e9899311c62f27b2af683fb4c40add4e"; // Troque pela sua chave
const wallet = new ethers.Wallet(privateKey, provider);

// Endereços dos contratos (troque pelos seus após o deploy)
const tokenAddress = "ENDERECO_TOKEN";
const nftAddress = "ENDERECO_NFT";
const stakingAddress = "ENDERECO_STAKING";
const governancaAddress = "ENDERECO_GOVERNANCA";

// ABIs mínimas (adicione as funções que for usar)
const tokenAbi = ["function approve(address,uint256)", "function mint(address,uint256)"];
const nftAbi = ["function mint(address)"];
const stakingAbi = ["function stake(uint256)", "function claimReward()"];
const governancaAbi = ["function criarProposta(string)", "function votar(uint256,bool)"];

async function main() {
  // Mint NFT
  const nft = new ethers.Contract(nftAddress, nftAbi, wallet);
  const tx1 = await nft.mint(wallet.address);
  await tx1.wait();
  console.log("NFT mintado!");

  // Stake tokens
  const token = new ethers.Contract(tokenAddress, tokenAbi, wallet);
  const staking = new ethers.Contract(stakingAddress, stakingAbi, wallet);
  await token.approve(stakingAddress, ethers.parseUnits("100"));
  const tx2 = await staking.stake(ethers.parseUnits("100"));
  await tx2.wait();
  console.log("Tokens em stake!");

  // Votar na DAO
  const governanca = new ethers.Contract(governancaAddress, governancaAbi, wallet);
  const tx3 = await governanca.criarProposta("Nova proposta");
  await tx3.wait();
  const tx4 = await governanca.votar(0, true);
  await tx4.wait();
  console.log("Votação realizada!");
}

main();
