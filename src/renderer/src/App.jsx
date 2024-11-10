import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Patient from './pages/pacientes/Patient';
function App() {
  return (
    <Router>
      <div>
        <Sidebar />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/patient' element= {<Patient />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;