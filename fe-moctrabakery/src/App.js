import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/products/ProductListPage';
import ProductDetailPage from './pages/products/ProductDetailPage';
import CartPage from './pages/CartPage';
import ProductManagerDashboard from './pages/ProductManagerDashboard';
import AdminDashboardDemo from './pages/AdminDashboardDemo';
import ProductManagerProducts from './pages/ProductManagerProducts';
import ProductAddPage from './pages/ProductAddPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<Navigate to="/ư" />} />
        <Route path="/manager/dashboard*" element={<ProductManagerDashboard />} />
        <Route path="/1234*" element={<AdminDashboardDemo />} />
        <Route path="/manager/products" element={<ProductManagerProducts />} />
        <Route path="/manager/add-product" element={<ProductAddPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
