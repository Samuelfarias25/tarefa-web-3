// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Governanca is Ownable {
    struct Proposta {
        string descricao;
        uint256 votosSim;
        uint256 votosNao;
        bool encerrada;
    }
    Proposta[] public propostas;
    mapping(address => mapping(uint256 => bool)) public votou;

    function criarProposta(string memory descricao) public onlyOwner {
        propostas.push(Proposta(descricao, 0, 0, false));
    }
    function votar(uint256 id, bool votoSim) public {
        require(!propostas[id].encerrada, "Proposta encerrada");
        require(!votou[msg.sender][id], "Ja votou");
        votou[msg.sender][id] = true;
        if (votoSim) {
            propostas[id].votosSim++;
        } else {
            propostas[id].votosNao++;
        }
    }
    function encerrarProposta(uint256 id) public onlyOwner {
        propostas[id].encerrada = true;
    }
}