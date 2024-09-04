import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function CategoryForm() {
  const { id } = useParams();  // Para editar uma categoria existente
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);

  useEffect(() => {
    // Buscar todos os restaurantes disponíveis
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/restaurants');
        setRestaurants(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar restaurantes:', error);
      }
    };

    fetchRestaurants();

    if (id) {
      // Se estamos editando, buscar a categoria
      const fetchCategory = async () => {
        try {
          const response = await axios.get(`http://localhost:1337/api/categories/${id}?populate=*`);
          const category = response.data.data;
          setName(category.attributes.Name);
          
          // Pega os restaurantes já associados
          const associatedRestaurants = category.attributes.restaurants.data.map(r => r.id);
          setSelectedRestaurants(associatedRestaurants);
        } catch (error) {
          console.error('Erro ao buscar categoria:', error);
        }
      };

      fetchCategory();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      data: {
        Name: name,
        restaurants: { connect: selectedRestaurants },  // Associa restaurantes
      },
    };

    try {
      if (id) {
        // Editar categoria
        await axios.put(`http://localhost:1337/api/categories/${id}`, payload);
      } else {
        // Criar nova categoria
        await axios.post('http://localhost:1337/api/categories', payload);
      }
      navigate('/categories');
    } catch (error) {
      console.error('Erro ao salvar categoria:', error);
    }
  };

  const handleRestaurantSelection = (event) => {
    const value = parseInt(event.target.value);
    setSelectedRestaurants((prevState) => {
      if (prevState.includes(value)) {
        return prevState.filter((r) => r !== value);
      } else {
        return [...prevState, value];
      }
    });
  };

  return (
    <div>
      <h1>{id ? 'Editar Categoria' : 'Adicionar Categoria'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome da Categoria:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Restaurantes:</label>
          {restaurants.map((restaurant) => (
            <div key={restaurant.id}>
              <input
                type="checkbox"
                value={restaurant.id}
                checked={selectedRestaurants.includes(restaurant.id)}
                onChange={handleRestaurantSelection}
              />
              <label>{restaurant.attributes.Name}</label>
            </div>
          ))}
        </div>
        <button type="submit">{id ? 'Atualizar' : 'Criar'}</button>
      </form>
    </div>
  );
}

export default CategoryForm;
