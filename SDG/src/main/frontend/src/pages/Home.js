import React from 'react';
import Header from '../components/HomeComponents/Header';
import Hero from '../components/HomeComponents/Hero';
import DashboardSection from '../components/HomeComponents/DashboardSection';
import ComicSection from '../components/HomeComponents/ComicSection';
import VouchersSection from '../components/HomeComponents/VouchersSection';
import Footer from '../components/HomeComponents/Footer';
import { Helmet } from 'react-helmet';
import './Home.css';

function Home() {
  return (
    <div className="Home">
      <Helmet>
          <title>Home</title>
      </Helmet>
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
