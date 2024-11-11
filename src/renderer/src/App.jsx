import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Patient from './pages/pacientes/Patient';
import NewPatient from './pages/newPatient/NewPatient';
import SearchBar from './components/searchBar/SearchBar';

function App() {
  return (
    <Router>
      <div>
        <Sidebar />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/patient' element={<Patient />} />
          <Route path='/new-patient' element={<NewPatient />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;