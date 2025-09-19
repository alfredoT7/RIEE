import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SidebarProvider, useSidebar } from './context/SidebarContext';
import { ThemeProvider } from './context/ThemeContext';
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
import { Toaster } from 'sonner';


const AppContent = () => {
  const { isCollapsed } = useSidebar();
  
  return (
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
      <Toaster 
        position="top-right"
        richColors
        closeButton
        expand={true}
        duration={4000}
      />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Router>
          <AppContent />
        </Router>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;