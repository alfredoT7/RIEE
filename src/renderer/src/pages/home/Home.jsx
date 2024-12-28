import './Home.css'
import TopInfoHome from '../../components/topInfoHome/TopInfoHome'
import CardPaciente from '../../components/cardPaciente/CardPaciente'
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <section className="section-main-container">
      <div className="chards-container">
        <TopInfoHome />
        <TopInfoHome />
      </div>
      <h3>Novedades</h3>
      <div className="parent">
        <div className="div1"></div>
        <div className="div2"></div>
        <div className="div3"></div>
        <div className="div4"></div>
      </div>
      <h3 className="recent-title">Pacientes Recientes</h3>
        <div className="head-paciente-title">
          <div className="ci"><p>CI</p></div>
          <div className="name"><p>Nombre</p></div>
          <div className="treatment"><p>Tratamiento</p></div>
          <div className="date"><p>Fecha</p></div>
        </div>

        <div className="card-paciente-container">
          <CardPaciente ci="12345600" nombre="Juan Perez" direccion="Ortodoncia" fechaNacimiento="12/12/2021" />
          <CardPaciente ci="1231" nombre="Juan Perez" direccion="Ortodoncia" fechaNacimiento="12/12/2021" />
          <CardPaciente ci="12345600" nombre="Juan Perez" direccion="Ortodoncia" fechaNacimiento="12/12/2021" />
          <CardPaciente ci="12345600" nombre="Juan Perez" direccion="Ortodoncia" fechaNacimiento="12/12/2021" />
          <CardPaciente ci="12345600" nombre="Juan Perez" direccion="Ortodoncia" fechaNacimiento="12/12/2021" />
        </div>  
        <Link to='/patient' className="see-more">Ver mas pacientes</Link>
    </section>
  );
};

export default Home