# Protocolo Web3: DevRewards (DRW)

MVP funcional de um protocolo descentralizado desenvolvido para a Residência em TIC 29 (Fase 2 Avançada).

## 🚀 Arquitetura e Contratos
O protocolo foi modelado para incentivar desenvolvedores, permitindo o stake de tokens com recompensas atreladas a oráculos de mercado e governança por meio de NFTs.

* **MeuToken (ERC-20):** `0x71cd18E346B510A0523545f18D6911D8e95FBA4c`
* **MeuNFT (ERC-721):** `0x8AA713343AA784659d588ca8AFC203f4F276781c`
* **Staking:** `0x82fD3e966D2930A80C35eFAbF9848d45F5782890`
* **Governanca (DAO):** `0x0A68f89D66EFc2f95eC7B2AF2cD70ef6e487469A`
* **OraculoETHUSD (Chainlink):** `0xdb5b64eC70be99aeD5147039A9f305749136C078`

## 🛠 Tecnologias Utilizadas
* Solidity ^0.8.20
* OpenZeppelin Contracts (Segurança e Padrões ERC)
* Ethers.js (Deploy customizado e Integração)
* Chainlink Oracles (Price Feeds)
* Node.js & Hardhat (Ambiente de compilação)

## 📌 Como Executar
1. Clone o repositório.
2. Instale as dependências com `npm install`.
3. Crie um arquivo `.env` na raiz com `SEPOLIA_URL` e `PRIVATE_KEY`.
4. Os contratos compilados estão na pasta `artifacts`.