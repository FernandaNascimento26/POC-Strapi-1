import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RestaurantsPage from './pages/RestaurantsPage';
import CategoriesPage from './pages/CategoriesPage';
import RestaurantForm from './pages/RestaurantForm';
import CategoryForm from './pages/CategoryForm';
import SobrePage from './pages/SobrePage';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/restaurants">Restaurantes</Link></li>
          <li><Link to="/categories">Categorias</Link></li>
          <li><Link to="/about">Sobre</Link></li>
        </ul>
      </nav>

      <Routes>
        {/* Rotas de Restaurantes */}
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/restaurants/new" element={<RestaurantForm />} />
        <Route path="/restaurants/edit/:id" element={<RestaurantForm />} />

        {/* Rotas de Categorias */}
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/new" element={<CategoryForm />} />
        <Route path="/categories/edit/:id" element={<CategoryForm />} />

        <Route path="/about" element={<SobrePage />} />

      </Routes>
    </Router>
  );
}

export default App;
