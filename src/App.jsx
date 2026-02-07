import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute"; // Import the ProtectedRoute
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";

import About from "./pages/About";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import Blog from "./Blog/Blog";
import Faq from "./contact/Faq/Faq";
import Cert from "./Certificates/Cert";
import Success from "./Products/Success";
import ProductVeiw from "./Products/ProductVeiw/ProductVeiwCard";
import ShippingCard from "./Products/ShppingContainer";
import SuccessPage from "./Products/Success";
import Download from "./Certificates/DownloadData/Download";
import OrdersPage from "./Admin/AdminPanel/AdminPanel/OrderPage";
import Products from "./Admin/AdminPanel/AdminPanel/products/Products";
import AdminUsers from "./Admin/AdminPanel/AdminUsers";
import BlogsAdmin from "./Admin/AdminPanel/AdminPanel/blog/BlogTable";
import AdminDashboard from "./Admin/AdminDashboard";
import BlogDetails from "./Blog/BlogDetailsContainer";
import NotFound from "./components/Features/NotFound";
import { ToastContainer } from "react-toastify";
import Title from "./Home/Title";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <div className="">
     
      <CartProvider>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/product/:id" element={<ProductVeiw />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="/products" element={<Product />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/certificates" element={<Cert />} />
            <Route path="/download-data" element={<Download />} />
            <Route path="/shopping" element={<ShippingCard />} />
            <Route path="/success" element={<SuccessPage />} />
               <Route path="*" element={<NotFound />} />
            {/* Protected Admin Routes */}
            <Route 
              path="/Admin" 
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/order" 
              element={
                <ProtectedRoute adminOnly>
                  <OrdersPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/users" 
              element={
                <ProtectedRoute adminOnly>
                  <AdminUsers />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/blog" 
              element={
                <ProtectedRoute adminOnly>
                  <BlogsAdmin />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/products" 
              element={
                <ProtectedRoute adminOnly>
                  <Products />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </AuthProvider>
      </CartProvider>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;