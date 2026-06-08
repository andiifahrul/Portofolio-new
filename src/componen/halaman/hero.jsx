import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

// Import gambar hero dari folder Assets
import { Link } from 'react-scroll';
import heroImage from '../../Assets/aboutme.jpg';

const Hero = () => {
  return (
    <section id="home" className="d-block d-lg-flex align-items-lg-center" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '50px' }}>
      <Container>
        {/* flex-column-reverse membuat gambar ada di atas saat di layar HP, dan di kanan saat di laptop */}
        <Row className="align-items-center flex-column-reverse flex-lg-row">
          
          {/* --- Kolom Teks (Kiri) --- */}
          <Col lg={6} className="text-center text-lg-start mt-5 mt-lg-0">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 }
                }
              }}
            >
              <motion.h6 variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } }} className="text-accent fw-bold mb-2 tracking-wide">HALO, SAYA</motion.h6>
              <motion.h1 variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } }} className="fs-2 fw-bold mb-3" style={{ color: 'var(--text-main)' }}>
                Seorang <span className="text-gradient">Web Developer | UI/UX Designer | Dashboard Architect.</span>
              </motion.h1>
              <motion.p variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } }} className="lead mb-5" style={{ color: 'var(--text-muted)' }}>
               Saya memadukan estetika desain dengan fungsionalitas sistem untuk membangun web interaktif dan dashboard data yang intuitif. Fokus saya adalah menciptakan solusi digital yang elegan, efisien, dan berpusat pada pengalaman pengguna.
              </motion.p>
              <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                <Button as={Link} to="projects" smooth={true} offset={-100} duration={500} className="nav-cta-btn px-4 py-2 fs-5" style={{ margin: 0, cursor: 'pointer' }}>
                  Lihat Proyek
                </Button>
              <div className="d-flex gap-3 align-items-center ms-lg-2">
                <a href="https://www.instagram.com/andii_fahrul" target="_blank" rel="noreferrer" className="contact-social-link text-decoration-none">
                  <FaInstagram size={22} />
                </a>
                <a href="https://linkedin.com/in/username-anda" target="_blank" rel="noreferrer" className="contact-social-link text-decoration-none">
                  <FaLinkedin size={22} />
                </a>
                <a href="https://github.com/username-anda" target="_blank" rel="noreferrer" className="contact-social-link text-decoration-none">
                  <FaGithub size={22} />
                </a>
              </div>
              </motion.div>
            </motion.div>
          </Col>

          {/* --- Kolom Gambar (Kanan) --- */}
          <Col lg={6} className="text-center mb-5 mb-lg-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="floating-img"
            >
              {/* Gambar Hero */}
              <img 
                src={heroImage} 
                alt="Hero Profile" 
                className="mx-auto rounded-circle custom-hero-img d-block"
                style={{ 
                  objectFit: 'cover'
                }} 
              />
            </motion.div>
          </Col>

        </Row>
      </Container>
    </section>
  );
};

export default Hero;