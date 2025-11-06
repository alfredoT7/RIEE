import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { SidebarProvider, useSidebar } from './context/SidebarContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Patient from './pages/pacientes/Patient';
import NewPatient from './pages/newPatient/NewPatient';
import SearchBar from './components/searchBar/SearchBar';
import Treatment from './pages/tratamientos/Treatment';
import NewTreatment from './pages/newTreatment/NewTreatment';
import Appointments from './pages/citas/Appointments';
import NewAppointment from './pages/newAppointment/NewAppointment';
import Inventory from './pages/inventario/Inventory';
import NewProduct from './pages/inventario/NewProduct';
import Cuentas from './pages/cuentas/Cuentas';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { Toaster } from 'sonner';


// Componente para proteger rutas
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'var(--background-color)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div className="loading-spinner" style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid rgba(102, 126, 234, 0.2)',
            borderTop: '4px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{ color: 'var(--text-color)' }}>Cargando...</p>
        </div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppContent = () => {
  const { isCollapsed } = useSidebar();
  const { isAuthenticated } = useAuth();
  
  return (
    <>
      <Routes>
        {/* Ruta de Login sin Sidebar ni Header */}
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} 
        />
        
        {/* Ruta de Registro sin Sidebar ni Header */}
        <Route 
          path="/register" 
          element={isAuthenticated ? <Navigate to="/" replace /> : <Register />} 
        />
        
        {/* Rutas protegidas con Layout */}
        <Route path="*" element={
          <ProtectedRoute>
            <div className="app-container">
              <Sidebar />
              <div className={`main-content ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path='/patient' element={<Patient />} />
                  <Route path='/new-patient' element={<NewPatient />} />
                  <Route path='/treatment' element={<Treatment />} />
                  <Route path='/new-treatment' element={<NewTreatment />} />
                  <Route path='/appointments' element={<Appointments />} />
                  <Route path='/nueva-cita' element={<NewAppointment />} />
                  <Route path='/inventario' element={<Inventory />} />
                  <Route path='/inventario/nuevo-producto' element={<NewProduct />} />
                  <Route path='/cuentas' element={<Cuentas />} />
                </Routes>
              </div>
            </div>
          </ProtectedRoute>
        } />
      </Routes>
      <Toaster 
        position="top-right"
        richColors
        closeButton
        expand={true}
        duration={4000}
      />
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SidebarProvider>
          <Router>
            <AppContent />
          </Router>
        </SidebarProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;