import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';  // ← NEW IMPORT
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import Alerts from './components/Alerts';
import Login from './components/Login';
import Register from './components/Register';
import "./styles/theme.css";
import "./styles/components.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '1rem 0', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>📚 LibraryAnalytics</div>
        {user && (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ color: 'white' }}>👋 {user.name}</span>
            <button onClick={logout} style={{ background: 'none', color: 'white', border: '1px solid white', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer' }}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles.length && !allowedRoles.includes(user.role)) return <Navigate to="/login" />;
  return children;
};

function AppContent() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute allowedRoles={['ADMIN', 'MANAGER']}><Analytics /></ProtectedRoute>} />
        <Route path="/alerts" element={<ProtectedRoute allowedRoles={['ADMIN', 'MANAGER']}><Alerts /></ProtectedRoute>} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
