import React from 'react'
import './Home.css'
import TopInfoHome from '../../components/topInfoHome/TopInfoHome'

const Home = () => {
  return (
    <section className="section-main-container">
      <div className="chards-container">
        <TopInfoHome />
        <TopInfoHome />
      </div>
      <div className="parent">
        <div className="div1"></div>
        <div className="div2"></div>
        <div className="div3"></div>
        <div className="div4"></div>
      </div>
    </section>
  );
};

export default Home