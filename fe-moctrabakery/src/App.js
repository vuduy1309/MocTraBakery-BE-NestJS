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
import CartPage from './pages/cart/CartPage';
import CheckoutPage from './pages/cart/CheckoutPage';
import ProductManagerDashboard from './pages/dashboard/ProductManagerDashboard';
import ProductManagerProducts from './pages/dashboard/ProductManagerProducts';
import ProductAddPage from './pages/dashboard/ProductAddPage';
import ProductManagerLayout from './layouts/ProductManagerLayout';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import ProductUpdatePage from './pages/dashboard/ProductUpdatePage';
import DiscountManagerPage from './pages/dashboard/DiscountManagerPage';

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
        <Route path="/cart/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/manager/dashboard*"
          element={<ProductManagerDashboard />}
        />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/manager" element={<ProductManagerLayout />}>
          <Route path="dashboard" element={<ProductManagerDashboard />} />
          <Route path="products" element={<ProductManagerProducts />} />
          <Route path="/manager/add-product" element={<ProductAddPage />} />
          <Route path="/manager/update-product/:id" element={<ProductUpdatePage />} />
          <Route path="/manager/discounts" element={<DiscountManagerPage/>}/>
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
