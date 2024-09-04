import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/categories');
        setCategories(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchCategories();
  }, []);

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:1337/api/categories/${id}`);
      setCategories(categories.filter(category => category.id !== id));
    } catch (error) {
      console.error('Erro ao deletar categoria:', error);
    }
  };

  return (
    <div>
      <h1>Lista de Categorias</h1>
      <Link to="/categories/new">Adicionar Categoria</Link>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <h2>{category.attributes?.Name}</h2>
            <Link to={`/categories/edit/${category.id}`}>Editar</Link>
            <button onClick={() => deleteCategory(category.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesPage;
