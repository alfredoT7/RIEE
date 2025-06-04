import './Home.css'
import TopInfoHome from '../../components/topInfoHome/TopInfoHome'
import CardPaciente from '../../components/cardPaciente/CardPaciente'
import { Link } from 'react-router-dom';
import PacienteHeader from '../../components/pacienteHeader/PacienteHeader';
import { Calendar, Clock, TrendingUp, Users } from 'lucide-react';
const Home = () => {
  return (
    <section className="section-main-container">
      <div className="chards-container">
      <TopInfoHome title="Calendario" quantity="10" porcentaje="20%" icon={Calendar} />
      <TopInfoHome title="Reloj" quantity="5" porcentaje="10%" icon={Clock} />
      <TopInfoHome title="Tendencias" quantity="15" porcentaje="30%" icon={TrendingUp} />
      <TopInfoHome title="Usuarios" quantity="50" porcentaje="40%" icon={Users} />
      </div>
      
      <h3 className="recent-title">Novedades</h3>
      <div className='news-container'>
        <div className='news-card'>
          <h4>Nuevo equipo de radiografía</h4>
          <p>Se ha adquirido un nuevo equipo de radiografía digital de última generación.</p>
        </div>
        <div className='news-card'>
          <h4>Nuevo equipo de radiografía</h4>
          <p>Se ha adquirido un nuevo equipo de radiografía digital de última generación.</p>
        </div>
        <div className='news-card'>
          <h4>Nuevo equipo de radiografía</h4>
          <p>Se ha adquirido un nuevo equipo de radiografía digital de última generación.</p>
        </div>
      </div>

      <h3 className="recent-title">Pacientes Recientes</h3>
        <div className="card-paciente-container">
          <CardPaciente ci="12345600" nombre="Juan Perez"   direccion="Ortodoncia"  fechaNacimiento="12/12/2021" numeroTelefonico={70774739}/>
          <CardPaciente ci="1231"     nombre="Juan Perez"   direccion="Ortodoncia"  fechaNacimiento="12/12/2021" numeroTelefonico={70774739}/>
          <CardPaciente ci="12345600" nombre="Juan Perez"   direccion="Ortodoncia"  fechaNacimiento="12/12/2021" numeroTelefonico={70774739}/>
          <CardPaciente ci="12345600" nombre="Juan Perez"   direccion="Ortodoncia"  fechaNacimiento="12/12/2021" numeroTelefonico={70774739}/>
          <CardPaciente ci="12345600" nombre="Juan Perez"   direccion="Ortodoncia"  fechaNacimiento="12/12/2021" numeroTelefonico={70774739}/>
        </div>  
        <Link to='/patient' className="see-more">Ver mas pacientes</Link>
    </section>
  );
};
export default Home