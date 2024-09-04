import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function RestaurantsPage() {
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

  const deleteRestaurant = async (id) => {
    try {
      await axios.delete(`http://localhost:1337/api/restaurants/${id}`);
      setRestaurants(restaurants.filter(restaurant => restaurant.id !== id));
    } catch (error) {
      console.error('Erro ao deletar restaurante:', error);
    }
  };

  return (
    <div>
      <h1>Lista de Restaurantes</h1>
      <Link to="/restaurants/new">Adicionar Restaurante</Link>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            <h2>{restaurant.attributes?.Name}</h2>
            <p>{restaurant.attributes?.Description?.[0]?.children?.[0]?.text || 'Descrição não disponível'}</p>
            <p>Categoria: {restaurant.attributes?.categories?.data?.attributes?.Name}</p>
            <Link to={`/restaurants/edit/${restaurant.id}`}>Editar</Link>
            <button onClick={() => deleteRestaurant(restaurant.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantsPage;
