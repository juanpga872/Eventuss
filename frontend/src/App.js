import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import EventosPage from './pages/EventosPage';
import AdminEventos from './pages/admin/AdminEventos';
import AdminCategorias from './pages/admin/AdminCategorias';
import AdminUsuarios from './pages/admin/AdminUsuarios';

function ProtectedRoute({ children, requiredRole }) {
  const { auth } = useAuth();
  if (!auth.token) return <Navigate to="/login" />;
  if (requiredRole && auth.role !== requiredRole) return <Navigate to="/eventos" />;
  return children;
}

function AppRoutes() {
  const { auth } = useAuth();
  return (
    <>
      {auth.token && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/eventos" element={<ProtectedRoute><EventosPage /></ProtectedRoute>} />
        <Route path="/admin/eventos" element={<ProtectedRoute requiredRole="ADMIN"><AdminEventos /></ProtectedRoute>} />
        <Route path="/admin/categorias" element={<ProtectedRoute requiredRole="ADMIN"><AdminCategorias /></ProtectedRoute>} />
        <Route path="/admin/usuarios" element={<ProtectedRoute requiredRole="ADMIN"><AdminUsuarios /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;