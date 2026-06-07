import { useState } from 'react'
import NavigationBar from './componen/halaman/navbar'
import Hero from './componen/halaman/hero'
import About from './componen/halaman/About'
import Services from './componen/halaman/services'
import Projects from './componen/halaman/Projects'
import Contact from './componen/halaman/contact'
import Footer from './componen/halaman/footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import { motion, useScroll } from 'framer-motion'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Admin from './componen/admin/Admin'
import Login from './componen/admin/Login'


function App() {
  const { scrollYProgress } = useScroll();

  const Home = () => (
    <>
      <NavigationBar />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </>
  );

  return (
    <Router>
      {/* Progress Bar Animasi Saat Scroll */}
      <motion.div
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          backgroundColor: "var(--accent-main)",
          transformOrigin: "0%",
          zIndex: 10000,
        }}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  )
}
     

export default App
