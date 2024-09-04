import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function RestaurantForm() {
  const { id } = useParams();  // Para editar um restaurante existente
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (id) {
      // Se estamos editando, buscar o restaurante
      const fetchRestaurant = async () => {
        try {
          const response = await axios.get(`http://localhost:1337/api/restaurants/${id}`);
          const restaurant = response.data.data;
          setName(restaurant.attributes.Name);
          setDescription(restaurant.attributes.Description || '');
        } catch (error) {
          console.error('Erro ao buscar restaurante:', error);
        }
      };

      fetchRestaurant();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Payload atualizado: descrição como texto simples
    const payload = {
      data: {
        Name: name,
        Description: description, // Envia a descrição diretamente como string
      },
    };

    try {
      if (id) {
        // Editar restaurante
        await axios.put(`http://localhost:1337/api/restaurants/${id}`, payload);
      } else {
        // Criar novo restaurante
        await axios.post('http://localhost:1337/api/restaurants', payload);
      }
      navigate('/restaurants');
    } catch (error) {
      console.error('Erro ao salvar restaurante:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h1>{id ? 'Editar Restaurante' : 'Adicionar Restaurante'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">{id ? 'Atualizar' : 'Criar'}</button>
      </form>
    </div>
  );
}

export default RestaurantForm;
