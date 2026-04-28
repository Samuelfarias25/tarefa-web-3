# Etapa 1 – Modelagem

## Problema que o protocolo resolve
O protocolo resolve a necessidade de uma plataforma descentralizada para recompensar usuários com tokens e NFTs por participarem de uma comunidade, permitindo staking, governança e integração com dados externos (oráculo).

## Diagrama de arquitetura (texto simplificado)

Usuário <-> Frontend Web3 <-> Contratos:
  - Token ERC-20 (recompensa e staking)
  - NFT ERC-721 (itens exclusivos)
  - Staking (recebe tokens, distribui recompensas)
  - Governança (DAO simplificada)
  - Oráculo (consulta preço ETH/USD)

## Justificativa dos padrões ERC
- ERC-20: padrão para tokens fungíveis, fácil integração e uso em exchanges.
- ERC-721: padrão para NFTs únicos, ideal para recompensas exclusivas.
- Uso de contratos OpenZeppelin para segurança e simplicidade.

---

Próximo passo: implementação dos contratos.
