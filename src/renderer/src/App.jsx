import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { SidebarProvider, useSidebar } from './context/SidebarContext'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import Sidebar from './components/sidebar/Sidebar'
import Header from './components/header/Header'
import Home from './pages/home/Home'
import Patient from './pages/pacientes/Patient'
import NewPatient from './pages/newPatient/NewPatient'
import Treatment from './pages/tratamientos/Treatment'
import NewTreatment from './pages/newTreatment/NewTreatment'
import Appointments from './pages/citas/Appointments'
import NewAppointment from './pages/newAppointment/NewAppointment'
import Inventory from './pages/inventario/Inventory'
import NewProduct from './pages/inventario/NewProduct'
import Cuentas from './pages/cuentas/Cuentas'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import AuthShell from './components/auth/AuthShell'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 dark:bg-slate-950">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#667eea]/20 border-t-[#667eea]" />
          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Cargando...</p>
        </div>
      </div>
    )
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

const GuestRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 dark:bg-slate-950">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#667eea]/20 border-t-[#667eea]" />
          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Cargando...</p>
        </div>
      </div>
    )
  }

  return isAuthenticated ? <Navigate to="/" replace /> : children
}

const AppContent = () => {
  const { isCollapsed } = useSidebar()

  return (
    <>
      <Routes>
        <Route
          element={
            <GuestRoute>
              <AuthShell />
            </GuestRoute>
          }
        >
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <div className="app-container">
                <Sidebar />
                <div className={`main-content ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
                  <Header />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/patient" element={<Patient />} />
                    <Route path="/new-patient" element={<NewPatient />} />
                    <Route path="/treatment" element={<Treatment />} />
                    <Route path="/new-treatment" element={<NewTreatment />} />
                    <Route path="/appointments" element={<Appointments />} />
                    <Route path="/nueva-cita" element={<NewAppointment />} />
                    <Route path="/inventario" element={<Inventory />} />
                    <Route path="/inventario/nuevo-producto" element={<NewProduct />} />
                    <Route path="/cuentas" element={<Cuentas />} />
                  </Routes>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster position="top-right" richColors closeButton expand duration={4000} />
    </>
  )
}

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
  )
}

export default App
