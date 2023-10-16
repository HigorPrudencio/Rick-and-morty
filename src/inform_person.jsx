import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Importe useParams para obter o ID do personagem da URL
import axios from 'axios';
import './info_person.css';


function InfoPage() {
  const { id } = useParams(); // Obtém o ID do personagem da URL
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    axios.get(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => {
        setCharacter(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar informações do personagem:', error);
      });
  }, []);



  return (
    <div className="Home_person">
      <h1>Detalhes do Personagem</h1>
      <div className="CharacterInfo">
        <img src={character?.image} alt={character?.name} />
        <p><strong>Nome:</strong> {character?.name}</p>
        <p><strong>Status:</strong> {character?.status}</p>
        <p><strong>Espécie:</strong> {character?.species}</p>
      </div>
    </div>
  );
}

export default InfoPage;
