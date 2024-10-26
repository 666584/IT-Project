import React from 'react';
import Header from './HomeComponents/Header';
import Hero from './HomeComponents/Hero';
import DashboardSection from './HomeComponents/DashboardSection';
import ComicSection from './HomeComponents/ComicSection';
import VouchersSection from './HomeComponents/VouchersSection';
import Footer from './HomeComponents/Footer';
import './Home.css';

function Home() {
  return (
    <div className="Home">
      <Header />
      <Hero />
      <DashboardSection />
      <ComicSection />
      <VouchersSection />
      <Footer />
    </div>
  );
}

export default Home;
