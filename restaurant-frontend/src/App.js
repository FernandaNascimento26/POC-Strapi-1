import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/restaurants?populate=*');
        setRestaurants(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar restaurantes:', error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="App">
      <h1>Lista de Restaurantes</h1>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            {/* Verifica se 'Name' e 'Description' existem antes de acessá-los */}
            <h2>{restaurant.attributes?.Name || 'Nome não disponível'}</h2>

            {/* Verifica se 'Description' é um array e contém texto */}
            <p>{restaurant.attributes?.Description?.[0]?.children?.[0]?.text || 'Descrição não disponível'}</p>

            {/* Verifica se 'categories' está presente antes de acessar */}
            {restaurant.attributes?.categories?.data?.attributes?.Name ? (
              <p>Categoria: {restaurant.attributes.categories.data.attributes.Name}</p>
            ) : (
              <p>Categoria não disponível</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
